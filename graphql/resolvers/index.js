const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const likesResolvers = require("./likes");

module.exports = {
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
};
