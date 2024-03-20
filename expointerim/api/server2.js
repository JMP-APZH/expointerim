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
    meetings: [Meeting]
    sliders: [Slider]
    categories: [Category]
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

  type Slider {
    id: ID!
    name: String!
    imageUrl: String!
  }

  type Category {
    id: ID!
    name: String!
    iconUrl: String!
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
    createSlider(
      name: String!
      imageUrl: String!
    ): Slider!
    createCategory(
      name: String!
      iconUrl: String!
    ): Category!
  }
`;

// Resolver function to handle createMeeting mutation
const resolvers = {
    Query: {
        users: async () => {
          const users = await prisma.user.findMany();
          return users;
        },
        meetings: async () => {
          const meetings = await prisma.meeting.findMany({
            include: { attendees: true },
          });
          // return meetings; // works exactly like the code below 
          return meetings.map((meeting) => ({
            ...meeting, // Include all other meeting fields
            attendees: meeting.attendees || [], // Return empty list if attendees is null
          }));
        },
        sliders: async () => {
          const sliders = await prisma.slider.findMany();
          return sliders;
        },
        categories: async () => {
          const categories = await prisma.category.findMany();
          return categories;
        },
        getUser: async (_, { id }) => {
            const parsedId = parseInt(id);
            if (isNaN(parsedId)) {
            throw new Error('Invalid id: cannot be parsed as a number');
            }
            console.log("Received ID:", id);
            // Use Prisma to fetch the user with the provided ID
            const user = await prisma.user.findUnique({
              where: { id: parsedId },
            });
            return user;
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
  createSlider: async (parent, args, context) => {
    try {
        const newSlider = await prisma.slider.create({
            data: { name: args.name, imageUrl: args.imageUrl },
          });
          return newSlider;

    } catch (error) {
      console.error(error);
      return {
        error: "Failed to create slider",
        // You can also include more specific error details here
      };
  }
},
createCategory: async (parent, args, context) => {
  try {
      const newCategory = await prisma.category.create({
          data: { name: args.name, iconUrl: args.iconUrl },
        });
        return newCategory;

  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create category",
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