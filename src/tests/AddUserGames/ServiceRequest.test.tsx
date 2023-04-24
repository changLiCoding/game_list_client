import { renderHook, act } from "@testing-library/react";
import useUserGames from "../../services/userGames/useUserGames";
import { ADD_USER_GAMES } from "../../services/userGames/queries";

import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  useMutation,
} from "@apollo/client";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });

describe("Add Game in UserGames", () => {
  it("Successful send addUserGames request", async () => {
    const token = import.meta.env.VITE_TOKEN_TEST;
    const { result } = renderHook(() => {
      return useMutation(ADD_USER_GAMES, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
    });
    // console.log("result: ", result);

    try {
      await act(async () => {
        const userGame = await result.current[0]({
          variables: {
            gameId: 2,
          },
        });
        // console.log("Game: ", userGame.data.addUserGames);

        expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
      });
    } catch (e: any) {
      // console.log("e: ", e);

      expect(e.message).toEqual(
        "Cannot read properties of null (reading 'game')"
      );
    }
  });

  it("Fail send addUserGames request when the credentials fail", async () => {
    const token = null;
    const { result } = renderHook(() => {
      return useMutation(ADD_USER_GAMES, {
        client: new ApolloClient({
          link: httpLink,
          cache: new InMemoryCache(),
        }),
        context: {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        },
      });
    });
    // console.log("result: ", result);

    try {
      await act(async () => {
        const userGame = await result.current[0]({
          variables: {
            gameId: 2,
          },
        });
        console.log("Game: ", userGame.data.addUserGames);

        expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
      });
    } catch (e: any) {
      // console.log("e: ", e);

      expect(e.message).toEqual(
        "Response not successful: Received status code 401"
      );
    }
  });
});
