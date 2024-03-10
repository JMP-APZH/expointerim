import { gql } from '@apollo/client';

// Define your subscription query
export const EVENT_CREATED = gql`
  subscription {
    eventCreated {
      id
      title
      date
    }
  }
`;