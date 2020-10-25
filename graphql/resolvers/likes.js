const { UserInputError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Mutation: {
    likePost: async (_, { postId }, context) => {
      // Get username of user who is trying to like a comment after authentication
      const { username } = checkAuth(context);
      //   Check if post exists and retrieve it
      const post = await Post.findById(postId);
      if (post) {
        //   Determine if user already liked this post
        if (post.likes.find((like) => like.username === username)) {
          // If truthy means that the user already liked the post so unlike it using array.filter
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // If falsey means that user hasn't liked the post already so like it using array.push like object
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }
        // After mutating the post - save it to db
        await post.save();
        return post;
      } else throw new UserInputError("Post not found.");
    },
  },
};
