// import { createServer } from 'node:http';
// import { PrismaClient } from '@prisma/client';
// import { createContext, createYoga } from 'graphql-yoga';
// import { schema } from './schema.js'

// import { GraphQLServer } from 'graphql-yoga';
import { ApolloServer } from 'apollo-server-express';
import express from 'express'; // Import Express
import { PrismaClient } from '@prisma/client';
import { schema } from './schema.js';

// Create Prisma Client instance
const prisma = new PrismaClient();

// Create an Express app
const app = express();

// // Create a context function to provide Prisma to resolvers
// const context = createContext({ prisma });

// Create a GraphQLServer instance with the provided schema and context
const server = new ApolloServer({
  schema,
  context: { prisma }, // Provide Prisma Client to the context
});

// // Create a Yoga instance with a GraphQL schema and context
// const yoga = createYoga({
//   schema,
//   context,
// });
 
// // Pass the Yoga instance into a server to hook into request handlers
// const server = createServer(yoga);
 
// // Apply ApolloServer middleware to the Express app
// server.applyMiddleware({ app });

// Start the server and apply the middleware
server.start().then(() => {
  server.applyMiddleware({ app });

// Set the port for the server
const PORT = process.env.PORT || 4000;

// Start the server and you're done!
// server.listen(4000, () => {
// server.start(4000, () => {
//   console.info('Server is running on http://localhost:4000/graphql')
//   console.log('Server running on:  http://localhost:4000/graphql')
  
// })

// Start the server
// app.listen(PORT, () => {
//   console.info(`Server is running on http://localhost:${PORT}/graphql`);
// });

app.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});
});