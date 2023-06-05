import { gql } from '@apollo/client';

export const USER = gql`
  query User {
    getUserById {
      id
      username
      bannerPicture
      userPicture
    }
  }
`;

export const EDIT_LISTS_ORDER = gql`
  mutation editListsOrder($payload: Scalar!, $action: String!) {
    updateUser(input: { payload: $payload, action: $action }) {
      user {
        listsOrder
      }
      errors
    }
  }
`;
