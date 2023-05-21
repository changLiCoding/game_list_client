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

export const GET_USER_GAME_BY_GAME_ID = gql`
  query GetUserGameByGameId($gameId: ID!) {
    getUserGameByGameId(gameId: $gameId) {
      gameNote
      gameStatus
      id
      review
      startDate
      completedDate
      rating
      private
      createdAt
      updatedAt
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
        bannerURL
        avgScore
        platforms
        tags
        genres
      }
      planning {
        id
        name
        imageURL
        bannerURL
        avgScore
        platforms
        tags
        genres
      }
      completed {
        id
        name
        imageURL
        bannerURL
        avgScore
        platforms
        tags
        genres
      }
      paused {
        id
        name
        imageURL
        bannerURL
        avgScore
        platforms
        tags
        genres
      }
      dropped {
        id
        name
        imageURL
        bannerURL
        avgScore
        platforms
        tags
        genres
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

export const EDIT_USER_GAME_BY_GAME_ID = gql`
  mutation EditUserGameByGameId($input: EditUserGamesInput!) {
    editUserGames(input: $input) {
      userGame {
        id
        gameNote
        gameStatus
        review
        startDate
        completedDate
        rating
        private
        createdAt
        updatedAt
      }
      errors
    }
  }
`;
