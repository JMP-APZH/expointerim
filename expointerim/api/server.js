import { createServer } from 'node:http';
import { PrismaClient } from '@prisma/client';
import { createContext, createYoga } from 'graphql-yoga';
import { schema } from './schema.js'


// Create Prisma Client instance
const prisma = new PrismaClient();

// Create a context function to provide Prisma to resolvers
const context = createContext({ prisma });


// Create a Yoga instance with a GraphQL schema and context
const yoga = createYoga({
  schema,
  context,
});
 
// Pass the Yoga instance into a server to hook into request handlers
const server = createServer(yoga);
 
// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})