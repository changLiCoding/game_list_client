import gql from "graphql-tag";

export const GET_ALL_GAMES = gql`
  query {
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
