import { gql } from '@apollo/client';

export const GET_GLOBAL_SOCIALS = gql`
  query GetGlobalSocials($limit: Int, $offset: Int) {
    getGlobalSocials(limit: $limit, offset: $offset) {
      ... on Post {
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
      ... on StatusUpdate {
        id
        userId
        username
        userPicture
        user {
          id
          username
          userPicture
        }
        gameId
        gameName
        imageURL
        updatedAt
        status
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
  }
`;
