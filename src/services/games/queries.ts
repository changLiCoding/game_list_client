import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { Game } from '../../graphql/__generated__/graphql';

export const GET_ALL_GAMES: TypedDocumentNode<{ allGames: Game[] }, void> = gql`
  query GetAllGames(
    $genre: [String!]
    $tag: [String!]
    $platform: [String!]
    $year: Int
    $search: String
    $sortBy: String
    $limit: Int
    $offset: Int
  ) {
    allGames(
      genre: $genre
      tag: $tag
      platform: $platform
      year: $year
      search: $search
      sortBy: $sortBy
      limit: $limit
      offset: $offset
    ) {
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
      isGameLiked
    }
  }
`;
