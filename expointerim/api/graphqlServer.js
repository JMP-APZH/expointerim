// graphqlServer.js

const { ApolloServer } = require('apollo-server');
const http = require('http'); // Import the 'http' module for WebSocket support
const typeDefs = require('./schema.graphql');
const resolvers = require('./resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions', // Specify the path for WebSocket subscriptions
  },
});

const httpServer = http.createServer(server); // Create an HTTP server

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
});