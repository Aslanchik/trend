const { AuthenticationError } = require("apollo-server");
const Post = require("../../models/Post");
const checkAuth = require("../../util/checkAuth");

module.exports = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    getPost: async (_, { postId }) => {
      try {
        const post = await Post.findById(postId);
        if (post) return post;
        else throw new Error("Post not found");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { body }, context) {
      // Authenticate user using request headers that are inside the context provided by apollo server
      const user = checkAuth(context);
      // If authentication went smoothly create a new post
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      // Save new post to db
      const post = await newPost.save();
      // Return it
      return post;
    },
    async deletePost(_, { postId }, context) {
      // Authenticate user using request headers that are inside the context provided by apollo server
      const user = checkAuth(context);
      // Find post and delete it
      try {
        const post = await Post.findById(postId);
        // Make sure only the user that made the post can delete it
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed!");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
