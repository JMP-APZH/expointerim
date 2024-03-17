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
import { PrismaClient, Prisma } from '@prisma/client'
// import { makeExecutableSchema } from '@graphql-tools/schema'



// export const schema = makeExecutableSchema({
export const schema = createSchema({

// Create Prisma Client instance

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
    events: [Event]
  }

  type Event {
    id: ID!
    userId: Int
    title: String
    participant: String      
    # participantIds: [Int]
    date: String
    startTime: String
    endTime: String
    location: String
  }

  type Mutation {
    createEvent( userId: Int, title: String!, participant: String, date: String!, startTime: String!, endTime: String!, location: String): Event!
  }
  `,
  resolvers: {
    Query: {
      getUser: (_, { id }) => User.findById(id),
      getEvent: (_, { id }) => Event.findById(id),
      getAllEvents: () => Event.find(),
    },
    // Mutation: {
    //   createEvent: (_, { title, participants, date, startTime, endTime, location }) => {
    //     const newEvent = new Event({ title, participants, date, startTime, endTime, location });
    //     pubsub.publish('EVENT_CREATED', { eventCreated: newEvent });
    //     return newEvent.save();
    //   },
    // },
    Mutation: {
      createEvent: async (_, { userId, title, participant, date, startTime, endTime, location }, { prisma }) => {
        
        // Extract user IDs from the fetched users
        // const participantIds = participants.map(participant => participant.id);

        // Use Prisma Client to create a new event in the database
        const createEvent = await prisma.event.create({
          data: {
            userId,
            title,
            participant,
            // participantIds: {
            //   // createMany: {
            //   //   data: [participants.map(participantId => ({ id: participantId }))],
            //   // },
            //   connect: participantIds.map(id => ({ id: id }))
            // },
            // include: {
            //   participants: true, // Include the participants in the response
            // },
            date,
            startTime,
            endTime,
            location
          }
        });
  
        return createEvent;
      }
    }
    // Subscription: {
    //   eventCreated: {
    //     subscribe: () => pubsub.asyncIterator(['EVENT_CREATED']),
    //   },
    // },
  }
})