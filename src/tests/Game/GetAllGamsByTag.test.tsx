import { apolloClient } from "../../graphql";
import { GET_ALL_GAMES_BY_TAG } from "../../services/game/queries";

describe("Get All Games By Tag Query", () => {

  it("Successful queries games objects by tag ID", async () => {

    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_TAG,
      variables: { tag: { ID: 1 } },
    })

    const gameData = query.data.getAllGamesByTag[0]
    expect(gameData.__typename).toBe("Game")
    expect(gameData.name).toBeDefined()
  });

  it("Successful queries games objects by tag name", async () => {

    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_TAG,
      variables: { tag: { name: "Singleplayer" } },
    })

    const gameData = query.data.getAllGamesByTag[0]
    expect(gameData.__typename).toBe("Game")
    expect(gameData.name).toBeDefined()
  });

  it("Successful queries a certain amount of games based on the limit field provided", async () => {

    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_TAG,
      variables: { tag: { name: "Singleplayer" }, limit: 1 }
    })

    const gameData = query.data.getAllGamesByTag[0]

    expect(query.data.getAllGamesByTag).toHaveLength(1)
    expect(gameData.__typename).toBe("Game")
    expect(gameData.name).toBeDefined()
  });

  it("Throws an error if no variables are provided", async () => {
    await expect(apolloClient.query({ query: GET_ALL_GAMES_BY_TAG })).rejects
      .toThrow('Variable $tag of type TagAttributes! was provided invalid value');
  });

});
