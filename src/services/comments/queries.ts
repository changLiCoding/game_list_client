import { gql } from '@apollo/client';

export const ADD_COMMENT_TO_COMMENTABLE = gql`
  mutation AddCommentToCommentable(
    $commentableId: ID!
    $commentableType: String!
    $body: String!
  ) {
    addCommentToCommentable(
      input: {
        commentableId: $commentableId
        commentableType: $commentableType
        body: $body
      }
    ) {
      comment {
        id
        commentableId
        commentableType
        user {
          id
          username
          userPicture
        }
        body
        updatedAt
        commentable {
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
            comments {
              id
              body
              user {
                id
                username
                userPicture
              }
              updatedAt
            }
          }
          ... on Follow {
            id
          }
          ... on Post {
            id
            userId
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
      errors
    }
  }
`;
