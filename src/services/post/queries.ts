import { gql } from '@apollo/client';

export const GET_GLOBAL_POSTS = gql`
  query getGlobalPosts {
    getGlobalPosts {
      id
      userId
      username
      userPicture

      updatedAt
      text
      likesCount
      likedUsers {
        id
        username
        userPicture
      }
    }
  }
`;
