const postsResolvers = require("./posts");
const usersResolvers = require("./users");

module.exports = {
  // Export Queries (get data)
  Query: {
    ...postsResolvers.Query,
  },
  // Export Mutations (change, update, create, delete data etc)
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
  },
};
