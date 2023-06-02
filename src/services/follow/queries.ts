import { gql } from '@apollo/client';

export const GET_ALL_FOLLOWS = gql`
  query GetAllFollows {
    getAllFollows {
      followed {
        id
        username
        userPicture
      }
      followedId
    }
  }
`;
