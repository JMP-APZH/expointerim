// const { ApolloServer } = require('apollo-server-express');
// const http = require('http');
// const typeDefs = require('./schema.graphql');
// const resolvers = require('./resolvers');

import { ApolloServer } from 'apollo-server-express';
import http from 'http';
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  subscriptions: {
    path: '/subscriptions',
  },
});

const app = require('express')();
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
