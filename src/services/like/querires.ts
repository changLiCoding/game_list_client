import { gql } from '@apollo/client';

export const ADD_LIKE_TO_LIKEABLE = gql`
  mutation AddLikeToLikeable($likeableId: ID!, $likeableType: String!) {
    addLikeToLikeable(
      input: { likeableId: $likeableId, likeableType: $likeableType }
    ) {
      like {
        id
        likeableId
        likeableType
        userId
        user {
          id
          username
          userPicture
        }
        likeable {
          __typename
          ... on StatusUpdate {
            gameId
            gameName
            status
            likesCount
          }
          ... on Follow {
            id
          }
        }
      }
      errors
    }
  }
`;
