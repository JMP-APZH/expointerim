// import { loadFilesSync } from '@graphql-tools/load-files';
// import { makeExecutableSchema } from '@graphql-tools/schema';

// const typeDefs = loadFilesSync(`${__dirname}/schema.graphql`, { extensions: ['graphql'] });

// const schema = makeExecutableSchema({
//   typeDefs,
//   // Add resolvers here if needed
// });

// export default schema;


// import { makeExecutableSchema } from '@graphql-tools/schema'
 
// export const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// })

import { createSchema } from 'graphql-yoga'
import { pubsub } from './pubsub.js';
// import { makeExecutableSchema } from '@graphql-tools/schema'
 
// export const schema = makeExecutableSchema({
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
    
  schema {
    query: Query
  }
 
  type Query {
    getUser(id: ID!): User
    getEvent(id: ID!): Event
    getAllEvents: [Event!]!
  }
 
  type User {
    id: ID!
    firstname: String
    lastname: String
    email: String!
    events: [Event!]!
  }

  type Event {
    id: ID!
    title: String
    participants: [User!]!
    date: String
    startTime: String
    endTime: String
    location: String
  }

  type Mutation {
    createEvent(title: String!, participants: [ID!]!, date: String!, startTime: String!, endTime: String!, location: String): Event!
  }
  `,
  resolvers: {
    Query: {
      getUser: (_, { id }) => User.findById(id),
      getEvent: (_, { id }) => Event.findById(id),
      getAllEvents: () => Event.find(),
    },
    Mutation: {
      createEvent: (_, { title, participants, date, startTime, endTime, location }) => {
        const newEvent = new Event({ title, participants, date, startTime, endTime, location });
        pubsub.publish('EVENT_CREATED', { eventCreated: newEvent });
        return newEvent.save();
      },
    },
    // Subscription: {
    //   eventCreated: {
    //     subscribe: () => pubsub.asyncIterator(['EVENT_CREATED']),
    //   },
    // },
  }
})