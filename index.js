const { ApolloServer, PubSub } = require("apollo-server");
const express = require("express");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs");

const app = express();

// Init PubSub for Subscriptions
const pubsub = new PubSub();

// Define Apollo Server
const server = new ApolloServer({
  // Type definitions of the data to query/mutate
  typeDefs,
  // How the data is queried/mutated
  resolvers,
  // Get the req metadata/headers etc and pubsub
  context: ({ req }) => ({ req, pubsub }),
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8181;
// Init connection to mongodb
mongoose
  .connect(process.env.MONGODB || MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //   Init Apollo Server
    return server.listen({ port: PORT }).then((res) => {
      console.log(`server running at ${res.url}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
