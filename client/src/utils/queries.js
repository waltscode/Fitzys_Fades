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

// most recent appointment
export const GET_USER_MOST_RECENT_APPOINTMENT = gql`
  query MostRecentAppointment($userId: ID!) {
    userMostRecentAppointment(userId: $userId) {
      _id
      barber_name
      date
      time
      service
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

export const GET_USER_WITH_APPOINTMENTS = gql`
  query GetUserWithAppointments($userId: ID!) {
    user(id: $userId) {
      _id
      user_name
      email
      appointments {
        _id
        barber_name
        date
        time
        service
      }
    }
  }
`;

