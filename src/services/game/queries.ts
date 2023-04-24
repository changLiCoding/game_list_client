import gql from "graphql-tag";
import { Game, QueryGetAllGamesByGenreArgs, QueryGetAllGamesByPlatformArgs, QueryGetAllGamesByTagArgs } from "../../graphql/__generated__/graphql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const GET_ALL_GAMES_BY_GENRE: TypedDocumentNode<Game[], QueryGetAllGamesByGenreArgs> = gql`
  query GetAllGamesByGenre($genre: GenreAttributes!, $limit: Int) {
    getAllGamesByGenre(genre: $genre, limit: $limit) {
      name
    }
  }
`;

export const GET_ALL_GAMES_BY_PLATFORM: TypedDocumentNode<Game[], QueryGetAllGamesByPlatformArgs> = gql`
  query GetAllGamesByPlatform($platform: PlatformAttributes!, $limit: Int) {
    getAllGamesByPlatform(platform: $platform, limit: $limit) {
      name
    }
  }
`;

export const GET_ALL_GAMES_BY_TAG: TypedDocumentNode<Game[], QueryGetAllGamesByTagArgs> = gql`
  query GetAllGamesByTag($tag: TagAttributes!, $limit: Int) {
    getAllGamesByTag(tag: $tag, limit: $limit) {
      name
    }
  }
`;
