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
        role
      }
    }
  }
`;

export const CREATE_ADMIN_USER = gql`
  mutation CreateAdminUser($userInput: UserInput!, $adminKey: String!) {
    createAdminUser(userInput: $userInput, adminKey: $adminKey) {
      token
      user {
        _id
        email
        phone
        user_name
        role
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

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($name: String!, $email: String!, $message: String!){
    createMessage(name: $name, email: $email, message: $message){
      name
      email
      message
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

//mutations not yet implemented in FrontEnd but just in case. might not be correct
// just had to reverse order to ali
export const DELETE_APPOINTMENT = gql`
mutation DeleteAppointment($id: ID!) {
  deleteAppointment(id: $id) {
    _id
    barber_name
    date
    time
    service
  }
}
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      messages {
        name
        email
        message
      }
    }
  }
`;

export const UPDATE_APPOINTMENT = gql`
  mutation UpdateAppointment($id: ID!, $barberName: String!, $date: String!, $time: String!, $service: String!) {
    updateAppointment(id: $id, barber_name: $barberName, date: $date, time: $time, service: $service) {
      _id
      barber_name
      date
      time
      service
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $user_name: String!, $email: String!, $phone: String!, $password: String) {
    updateUser(id: $id, user_name: $user_name, email: $email, phone: $phone, password: $password) {
      user_name
      email
      phone
      password
    }
  }
`;
