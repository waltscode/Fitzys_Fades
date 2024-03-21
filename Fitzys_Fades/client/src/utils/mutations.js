import { gql } from '@apollo/client';

export const CREATE_USER = gql`
mutation CreateUser($userInput: UserInput!) {
    createUser(userInput: $userInput) {
      token
      user {
        _id
        email
        phone
        user_name
      }
    }
  }
  `;


export const CREATE_APPOINTMENT = gql`
  mutation CreateAppointment($barberName: BarberEnum!, $date: String!, $time: String!, $service: String!) {
    createAppointment(barber_name: $barberName, date: $date, time: $time, service: $service) {
      barber_name
      date
      service
      time
    }
  }
`
  export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

