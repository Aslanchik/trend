const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) => {
      // Get username of user who is trying to save a comment after authentication
      const { username } = checkAuth(context);
      // Check if comment body is empty
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: { body: "Comment body must not be empty" },
        });
      }
      // Check if post exists and retrieve it
      const post = await Post.findById(postId);
      if (post) {
        //   Add comment to the top of the comments array in the post
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString(),
        });
        // Save changes to post
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    deleteComment: async (_, { postId, commentId }, context) => {
      // Get username of user who is trying to delete a comment after authenticating him
      const { username } = checkAuth(context);
      //   Check if post exists and retrieve it
      const post = await Post.findById(postId);
      if (post) {
        //   Find the index of the comment that is being deleted
        const commentIdx = post.comments.findIndex(
          (com) => com.id === commentId
        );
        // Check that the selected comments username matches the username that is requesting this deletion
        if (post.comments[commentIdx].username === username) {
          // Delete selected Comment
          post.comments.splice(commentIdx, 1);
          //   Save changes
          await post.save();
          return post;
        } else {
          // If creator username doesnt match request username throw error
          throw new AuthenticationError("Action not permitted.");
        }
      } else {
        //   If post doesnt exist throw error
        throw new UserInputError("Post not found.");
      }
    },
  },
};
