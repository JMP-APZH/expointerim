import { PubSub } from 'graphql-subscriptions';

// Create a new instance of PubSub
const pubsub = new PubSub();

// Export pubsub so it can be used in other parts of your code
export { pubsub };