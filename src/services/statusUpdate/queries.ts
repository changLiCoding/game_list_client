import { gql } from '@apollo/client';

export const GET_ALL_STATUS_UPDATES_FOR_A_USER = gql`
  query getAllStatusUpdatesForAUser {
    getAllStatusUpdatesForAUser {
      id
      gameId
      gameName
      user {
        id
        username
        userPicture
      }
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
`;

export const GET_GLOBAL_STATUS_UPDATES = gql`
  query getGlobalStatusUpdates {
    getGlobalStatusUpdates {
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
`;
