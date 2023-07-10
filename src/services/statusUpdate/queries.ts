import { gql } from '@apollo/client';

export const GET_ALL_STATUS_UPDATES_FOR_A_USER = gql`
  query getAllStatusUpdatesForAUser {
    getAllStatusUpdatesForAUser {
      id
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
    }
  }
`;
