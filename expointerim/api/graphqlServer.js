// graphqlServer.js

import { ApolloServer } from 'apollo-server';
import { createServer } from 'http'; // Import the 'http' module for WebSocket support
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions', // Specify the path for WebSocket subscriptions
  },
});

const httpServer = createServer(server); // Create an HTTP server

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
  console.log(`🚀 Subscriptions ready at ${server.subscriptionsPath}`);
});