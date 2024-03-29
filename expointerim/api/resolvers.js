// // resolvers.js

// const resolvers = {
//   Query: {
//     getUser: (_, { id }) => User.findById(id),
//     getEvent: (_, { id }) => Event.findById(id),
//     getAllEvents: () => Event.find(),
//   },
//   Mutation: {
//     createEvent: (_, { title, participants, date, startTime, endTime, location }) => {
//       const newEvent = new Event({ title, participants, date, startTime, endTime, location });
//       pubsub.publish('EVENT_CREATED', { eventCreated: newEvent });
//       return newEvent.save();
//     },
//   },
//   Subscription: {
//     eventCreated: {
//       subscribe: () => pubsub.asyncIterator(['EVENT_CREATED']),
//     },
//   },
// };

// export default resolvers;
// export default resolvers;

// resolvers.js

// import { PubSub } from 'graphql-subscriptions';
import { pubsub } from './pubsub.js';

export const  resolvers = {
  Query: {
    getUser: (_, { id }) => User.findById(id),
    getEvent: (_, { id }) => Event.findById(id),
    getAllEvents: () => Event.find(),
  },
  Mutation: {
    createEvent: (_, { title, participants, date, startTime, endTime, location }) => {
      const newEvent = new Event({ title, participants, date, startTime, endTime, location });
      // pubSub.publish('EVENT_CREATED', { eventCreated: newEvent });
      return newEvent.save();
    },
  },
  // Subscription: {
  //   eventCreated: {
  //     subscribe: () => pubsub.asyncIterator(['EVENT_CREATED']),
  //   },
  // },
};




