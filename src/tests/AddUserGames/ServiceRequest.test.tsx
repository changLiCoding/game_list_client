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
	it("Should not add userGames request", async () => {
		const token =
			"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNywiZXhwIjoxNjg0ODk2NjcyfQ.-cq-wkG8phyBIHPjNYqi7mU2BsnDlBzDKhdcHcoxBYQ";
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
		console.log("result: ", result);

		try {
			await act(async () => {
				const userGame = await result.current[0]({
					variables: {
						gameId: 1,
					},
				});
				console.log("Game: ", userGame.data.addUserGames);

				expect(userGame.data.addUserGames.userGame.game.id).toEqual("1");
			});
		} catch (e: any) {
			console.log("e: ", e);

			expect(e.message).toEqual("Invalid email or password");
		}
	});
});
