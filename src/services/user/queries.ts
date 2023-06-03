import { gql } from '@apollo/client';

export const USER = gql`
  query User {
    getUserById {
      username
      bannerPicture
      userPicture
    }
  }
`;

export const ALL_FOLLOWS_AND_FOLLOWERS = gql`
  query AllFollowsAndFollowers {
    getUserById {
      id
      followedUsers {
        id
        username
        userPicture
      }
      followers {
        id
        username
        userPicture
      }
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
