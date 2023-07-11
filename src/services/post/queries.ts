import { gql } from '@apollo/client';

export const GET_GLOBAL_POSTS = gql`
  query getGlobalPosts {
    getGlobalPosts {
      id
      userId
      username
      userPicture
      user {
        id
        username
        userPicture
      }

      updatedAt
      text
      likesCount
      likedUsers {
        id
        username
        userPicture
      }
      comments {
        id
        body
        commentableId
        commentableType
        user {
          id
          username
          userPicture
        }
        updatedAt
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
        user {
          id
          username
          userPicture
        }
        updatedAt
        text
        likesCount
        likedUsers {
          id
          username
          userPicture
        }
        comments {
          id
          body
          commentableId
          commentableType
          user {
            id
            username
            userPicture
          }
          updatedAt
        }
      }
      errors
    }
  }
`;
