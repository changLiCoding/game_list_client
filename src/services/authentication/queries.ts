import { gql } from '@apollo/client';

// export const GET_ALL_USERS = gql`
//   query GetAllUsers {
//     users {
//       id
//       name
//     }
//   }
// `;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      user {
        username
      }
      token
      errors
    }
  }
`;

export const REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      user {
        username
      }
      token
      errors
    }
  }
`;
