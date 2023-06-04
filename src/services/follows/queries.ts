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
