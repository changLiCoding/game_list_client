import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { Game } from '../../graphql/__generated__/graphql';

export const GET_ALL_GAMES: TypedDocumentNode<{ allGames: Game[] }, void> = gql`
  query GetAllGames(
    $genre: [String!]
    $tag: [String!]
    $platform: [String!]
    $year: Int
  ) {
    allGames(genre: $genre, tag: $tag, platform: $platform, year: $year) {
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
    }
  }
`;
