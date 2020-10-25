const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");
const typeDefs = require("./graphql/typeDefs");

// Define Apollo Server
const server = new ApolloServer({
  // Type definitions of the data to query/mutate
  typeDefs,
  // How the data is queried/mutated
  resolvers,
  // Get the req metadata/headers etc
  context: ({ req }) => ({ req }),
});

// Init connection to mongodb
mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    //   Init Apollo Server
    return server.listen({ port: 8181 }).then((res) => {
      console.log(`server running at ${res.url}`);
    });
  });
