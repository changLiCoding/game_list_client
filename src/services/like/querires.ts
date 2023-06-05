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
          ... on Follow {
            id
          }
        }
      }
      errors
    }
  }
`;

export const REMOVE_LIKE_FROM_LIKEABLE = gql`
  mutation RemoveLikeFromLikeable($likeableId: ID!, $likeableType: String!) {
    removeLikeFromLikeable(
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
          ... on Follow {
            id
          }
        }
      }
      errors
    }
  }
`;
