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

export const CREATE_POST = gql`
  mutation createPost($text: String!) {
    createPost(input: { text: $text }) {
      post {
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
      errors
    }
  }
`;
