// const { ApolloServer, gql } = require('apollo-server');
// const { PrismaClient } = require('@prisma/client');


import { ApolloServer, gql } from 'apollo-server';
import { PrismaClient } from '@prisma/client';
import pkg from 'graphql-iso-date';
const { GraphQLDateTime } = pkg;

const prisma = new PrismaClient();

// Type definitions for GraphQL schema
const typeDefs = gql`
    scalar DateTime

  type Query {
    getUser(id: ID!): User
    users: [User!]!
    getMeeting(id: ID!): Meeting
    getAllMeetings: [Meeting!]!
  }

  type Meeting {
    id: ID!
    title: String!
    startTime: DateTime!
    endTime: DateTime!
    attendees: [User!]!
  }

  type User {
    id: ID!
    email: String!
    name: String!
    # meetings(where: MeetingFilterInput): [Meeting!]!  
    # Optional: Link user to meetings
  }

  type Mutation {
    createUser(
      email: String!
      name: String!
    ): User!
    createMeeting(
      title: String!
      startTime: DateTime!
      endTime: DateTime!
      attendeeIds: [Int]
    ): Meeting!
  }
`;

// Resolver function to handle createMeeting mutation
const resolvers = {
    Query: {
        users: async () => {
          const users = await prisma.user.findMany();
          return users;
        },
    },
  Mutation: {
    createMeeting: async (_, args) => {
        console.log("attendeeIds:", args.attendeeIds);

      const meeting = await prisma.meeting.create({
        data: {
          title: args.title,
          startTime: args.startTime,
          endTime: args.endTime,
        //   attendeeIds: args.attendeeIds,
          attendees: { 
            // connect: { id: args.attendeeIds }
            // connect: [{ id: args.attendeeIds[0] }, { id: args.attendeeIds[1] }],  // Use array of objects
            connect: args.attendeeIds.map((id) => ({ id })),
          },
          
        //   alternative:
        //   attendees: {
        //     where: { OR: [{ id: args.attendeeIds[0] }, { id: args.attendeeIds[1] }] },  // Use where with OR clause
        //   },
        },
        include: { attendees: true },
      });
      console.log("Created meeting:", meeting);
      return meeting;
    },
    createUser: async (parent, args, context) => {
        try {
            const newUser = await prisma.user.create({
                data: { email: args.email, name: args.name },
              });
              return newUser;

        } catch (error) {
          console.error(error);
          return {
            error: "Failed to create user",
            // You can also include more specific error details here
          };
      }
  },
}
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(` Server ready at ${url}`);
});