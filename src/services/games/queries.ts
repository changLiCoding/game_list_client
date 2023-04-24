import gql from "graphql-tag";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { Game } from "../../graphql/__generated__/graphql";

export const GET_ALL_GAMES: TypedDocumentNode<Game[], void> = gql`
  query GetAllGames {
    allGames {
      id
      name
      description
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
