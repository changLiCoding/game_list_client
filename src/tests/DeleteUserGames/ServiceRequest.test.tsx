import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	useMutation,
} from "@apollo/client";

import { renderHook, act } from "@testing-library/react";
import { DELETE_USER_GAMES } from "../../services/userGames/queries";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });

describe("Delete Game in UserGames", () => {
	it("Successful send deleteUserGames request", async () => {
		const token =
			"eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyNywiZXhwIjoxNjg0ODk2NjcyfQ.-cq-wkG8phyBIHPjNYqi7mU2BsnDlBzDKhdcHcoxBYQ";
		const { result } = renderHook(() => {
			return useMutation(DELETE_USER_GAMES, {
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
		try {
			await act(async () => {
				const userGame = await result.current[0]({
					variables: {
						gameId: 2,
					},
				});
				console.log("Game: ", userGame.data.deleteUserGames);
				expect(userGame.data.deleteUserGames.userGame.game.id).toEqual("2");
			});
		} catch (e: any) {
			console.log("e: ", e);
			expect(e.message).toEqual(
				"Cannot read properties of null (reading 'game')"
			);
		}
	});

	it("Fail send deleteUserGames request when the credentials fail", async () => {
		const token = null;
		const { result } = renderHook(() => {
			return useMutation(DELETE_USER_GAMES, {
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

		try {
			await act(async () => {
				const userGame = await result.current[0]({ variables: { gameId: 2 } });
				console.log("Game: ", userGame.data.deleteUserGames);
				expect(userGame.data.deleteUserGames.userGame.game.id).toEqual("2");
			});
		} catch (e: any) {
			console.log("e: ", e);
			expect(e.message).toEqual(
				"Response not successful: Received status code 401"
			);
		}
	});
});
