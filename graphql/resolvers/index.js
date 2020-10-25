const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
  // Export Post Modifier - takes the query and modifies the data we want to modify by our specifications
  Post: {
    // Looks at parent(the data that comes from query) and checks likes and comments length before sending data back
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  // Export Queries (get data)
  Query: {
    ...postsResolvers.Query,
  },
  // Export Mutations (change, update, create, delete data etc)
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation,
    ...likesResolvers.Mutation,
  },
  // Export Subscriptions(listens to events that occur on specific data)
  Subscription: {
    ...postsResolvers.Subscription,
  },
};
