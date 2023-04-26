import { apolloClient } from "@/graphql";
import { GET_ALL_GAMES } from "@/services/games/queries";

describe("Get All Games Query", () => {
  it("Successful queries games objects", async () => {
    const query = await apolloClient.query({
      query: GET_ALL_GAMES,
      context: {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN_TEST}`,
        },
      },
    });

    const gameData = query.data.allGames[0];

    expect(gameData.id).not.toBeNull();
    expect(gameData.name).not.toBeNull();
    expect(gameData.description).not.toBeNull();
    expect(gameData.imageURL).not.toBeNull();
    expect(gameData.releaseDate).not.toBeNull();
    expect(gameData.avgScore).not.toBeNull();
    expect(gameData.totalRating).not.toBeNull();

    expect(Array.isArray(gameData.tags)).toBe(true);
    expect(Array.isArray(gameData.genres)).toBe(true);
    expect(Array.isArray(gameData.platforms)).toBe(true);
  });
});
