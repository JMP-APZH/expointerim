import { gql } from '@apollo/client';

export const GET_MEETINGS = gql`
  query Meetings {
        meetings {
            id
            title
            startTime
            endTime
            attendees {
                id
                name
            }
    }
  }
`;