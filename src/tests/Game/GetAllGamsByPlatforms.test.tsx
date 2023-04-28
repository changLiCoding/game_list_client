import { apolloClient } from "@/graphql";
import { GET_ALL_GAMES_BY_PLATFORM } from "@/services/game/queries";

describe("Get All Games By Platforms Query", () => {
  it("Successful queries games objects by platform ID", async () => {
    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_PLATFORM,
      variables: { platform: { ID: 1 } },
      context: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        },
      },
    });

    const gameData = query.data.getAllGamesByPlatform[0];
    expect(gameData.__typename).toBe("Game");
    expect(gameData.name).toBeDefined();
  });

  it("Successful queries games objects by platform name", async () => {
    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_PLATFORM,
      variables: { platform: { name: "Xbox" } },
      context: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        },
      },
    });

    const gameData = query.data.getAllGamesByPlatform[0];
    expect(gameData.__typename).toBe("Game");
    expect(gameData.name).toBeDefined();
  });

  it("Successful queries a certain amount of games based on the limit field provided", async () => {
    const query = await apolloClient.query({
      query: GET_ALL_GAMES_BY_PLATFORM,
      variables: { platform: { name: "Xbox" }, limit: 1 },
      context: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        },
      },
    });

    const gameData = query.data.getAllGamesByPlatform[0];

    expect(query.data.getAllGamesByPlatform).toHaveLength(1);
    expect(gameData.__typename).toBe("Game");
    expect(gameData.name).toBeDefined();
  });

  it("Throws an error if no variables are provided", async () => {
    await expect(
      apolloClient.query({
        query: GET_ALL_GAMES_BY_PLATFORM,
        context: {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
          },
        },
      })
    ).rejects.toThrow(
      "Variable $platform of type EntityIdNameAttributes! was provided invalid value"
    );
  });
});
