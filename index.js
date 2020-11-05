const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const resolvers = require("./graphql/resolvers");
/* const { MONGODB } = require("./config"); */
const typeDefs = require("./graphql/typeDefs");

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

const PORT = process.env.PORT || 8181;
// Init connection to mongodb
mongoose
  .connect(process.env.MONGODB, {
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
