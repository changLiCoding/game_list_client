import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import type {
  Game,
  GameFilters,
  GetGameFiltersQuery,
  QueryGetAllGamesByGenreArgs,
  QueryGetAllGamesByPlatformArgs,
  QueryGetAllGamesByTagArgs,
} from '../../graphql/__generated__/graphql';

export const GET_GAME_BY_ID = gql`
  query GetGameById($id: ID!) {
    getGameById(id: $id) {
      id
      name
      description
      bannerURL
      imageURL
      releaseDate
      avgScore
      totalRating
      genres
      tags
      platforms
      isGameAdded
    }
  }
`;

export const GET_ALL_GAMES_BY_GENRE: TypedDocumentNode<
  { getAllGamesByGenre: Game[] },
  QueryGetAllGamesByGenreArgs
> = gql`
  query GetAllGamesByGenre($genre: EntityIdNameAttributes!, $limit: Int) {
    getAllGamesByGenre(genre: $genre, limit: $limit) {
      name
    }
  }
`;

export const GET_ALL_GAMES_BY_PLATFORM: TypedDocumentNode<
  { getAllGamesByPlatform: Game[] },
  QueryGetAllGamesByPlatformArgs
> = gql`
  query GetAllGamesByPlatform($platform: EntityIdNameAttributes!, $limit: Int) {
    getAllGamesByPlatform(platform: $platform, limit: $limit) {
      name
    }
  }
`;

export const GET_ALL_GAMES_BY_TAG: TypedDocumentNode<
  { getAllGamesByTag: Game[] },
  QueryGetAllGamesByTagArgs
> = gql`
  query GetAllGamesByTag($tag: EntityIdNameAttributes!, $limit: Int) {
    getAllGamesByTag(tag: $tag, limit: $limit) {
      name
    }
  }
`;

// https://stackoverflow.com/questions/67884720/typescript-omit-nested-property
type ChangeFields<T, R> = Omit<T, keyof R> & R;
export const GET_GAME_FILTERS: TypedDocumentNode<
  { getGameFilters: Omit<GameFilters, '__typename'> },
  ChangeFields<
    GetGameFiltersQuery,
    GetGameFiltersQuery['getGameFilters']['__typename']
  >
> = gql`
  query GetGameFilters {
    getGameFilters {
      genres
      platforms
      tags
      year
      errors
    }
  }
`;
