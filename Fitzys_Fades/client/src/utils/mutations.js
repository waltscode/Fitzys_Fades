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