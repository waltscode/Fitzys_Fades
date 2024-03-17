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

  export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;