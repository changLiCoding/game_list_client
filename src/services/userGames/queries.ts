import { gql } from '@apollo/client';

export const DELETE_USER_GAMES = gql`
  mutation DeleteUserGames($gameId: ID!) {
    deleteUserGames(input: { gameId: $gameId }) {
      userGame {
        id
        game {
          id
          name
          description
          imageURL
          bannerURL
          releaseDate
          avgScore
          genres
          platforms
          tags
        }
      }
      errors
    }
  }
`;

export const ADD_USER_GAMES = gql`
  mutation AddUserGames($gameId: ID!) {
    addUserGames(input: { gameId: $gameId }) {
      userGame {
        id
        game {
          id
          name
          description
          imageURL
          bannerURL
          releaseDate
          avgScore
          genres
          platforms
          tags
        }
      }
      errors
    }
  }
`;

export const GAMES_FOR_A_USER = gql`
  query GamesForAUser {
    gamesForAUser {
      id
      name
      description
      imageURL
      bannerURL
      releaseDate
      avgScore
      genres
      platforms
      tags
    }
  }
`;

export const GET_GAMES_BY_STATUS = gql`
  query GamesByTagsForAUser {
    gamesByStatusForAUser {
      playing {
        id
        name
        imageURL
        avgScore
        platforms
      }
      planning {
        id
        name
        imageURL
        avgScore
        platforms
      }
      completed {
        id
        name
        imageURL
        avgScore
        platforms
      }
      paused {
        id
        name
        imageURL
        avgScore
        platforms
      }
      dropped {
        id
        name
        imageURL
        avgScore
        platforms
      }
      playingCount
      planningCount
      completedCount
      pausedCount
      droppedCount
      totalCount
      listsOrder
      errors
    }
  }
`;
