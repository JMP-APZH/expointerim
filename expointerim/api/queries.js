import { gql } from '@apollo/client';

export const GET_EVENTS = gql`
  query GetEvents {
    events {
      id
      title
      date
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent($input: EventInput!) {
    createEvent(input: $input) {
      id
      title
      date
    }
  }
`;