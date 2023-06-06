import { gql } from '@apollo/client';

export const ALL_FOLLOWS_AND_FOLLOWERS = gql`
  query AllFollowsAndFollowers {
    getAllFollows {
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

export const ADD_FOLLOWS_BY_ID = gql`
  mutation AddFollowsById($followedId: ID!) {
    addFollowsById(input: { followedId: $followedId }) {
      follow {
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
      errors
    }
  }
`;

export const REMOVE_FOLLOWS_BY_ID = gql`
  mutation RemoveFollowsById($followedId: ID!) {
    removeFollowsById(input: { followedId: $followedId }) {
      follow {
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
      errors
    }
  }
`;
