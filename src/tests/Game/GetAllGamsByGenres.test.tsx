import { apolloClient } from "../../graphql";
import { GET_ALL_GAMES_BY_GENRE } from "../../services/game/queries";

describe("Get All Games By Genres Query", () => {

  it("Successful queries games objects by genre ID", async () => {

    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_GENRE,
      variables: { genre: { ID: 1 } },
    })

    const gameData = query.data.getAllGamesByGenre[0]
    expect(gameData.__typename).toBe("Game")
    expect(gameData.name).toBeDefined()
  });

  it("Successful queries games objects by genre name", async () => {

    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_GENRE,
      variables: { genre: { name: "Puzzle" } },
    })

    const gameData = query.data.getAllGamesByGenre[0]
    expect(gameData.__typename).toBe("Game")
    expect(gameData.name).toBeDefined()
  });

  it("Successful queries a certain amount of games based on the limit field provided", async () => {

    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_GENRE,
      variables: { genre: { name: "Puzzle" }, limit: 1 }
    })

    const gameData = query.data.getAllGamesByGenre[0]

    expect(query.data.getAllGamesByGenre).toHaveLength(1)
    expect(gameData.__typename).toBe("Game")
    expect(gameData.name).toBeDefined()
  });

  it("Throws an error if no variables are provided", async () => {
    await expect(apolloClient.query({ query: GET_ALL_GAMES_BY_GENRE })).rejects
      .toThrow('Variable $genre of type EntityIdNameAttributes! was provided invalid value');
  });

});
