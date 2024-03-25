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

export const GET_ALL_APPOINTMENTS = gql`
  query GetAllAppointments {
    appointments {
      _id
      barber_name
      date
      time
      service
      user {
        _id
        user_name
        email
      }
    }
  }
`;

