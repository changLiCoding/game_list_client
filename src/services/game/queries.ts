import gql from 'graphql-tag';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  Game,
  QueryGetAllGamesByGenreArgs,
  QueryGetAllGamesByPlatformArgs,
  QueryGetAllGamesByTagArgs,
} from '../../graphql/__generated__/graphql';

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

export const GET_ALL_GENRES = gql`
  query GetAllGenres {
    getAllGenres {
      name
    }
  }
`;

export const GET_ALL_PLATFORMS = gql`
  query GetAllPlatforms {
    getAllPlatforms {
      name
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      name
    }
  }
`;
