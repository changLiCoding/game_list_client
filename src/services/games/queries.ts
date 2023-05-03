import { gql } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { Game } from '../../graphql/__generated__/graphql';

export const GET_ALL_GAMES: TypedDocumentNode<{ allGames: Game[] }, void> = gql`
  query GetAllGames {
    allGames {
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
