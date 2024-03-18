import { gql } from '@apollo/client';

export const GET_USER_INFO = gql`
  query GetUser($userId: ID!) {
    user(id: $userId) {
      id
      name
      email
    }
  }
`;