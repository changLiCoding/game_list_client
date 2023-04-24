import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	useMutation,
} from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { renderHook, act, waitFor } from "@testing-library/react";
import { ADD_USER_GAMES } from "../../services/userGames/queries";
import { REGISTER } from "../../services/authentication/queries";

describe("Add Game in UserGames", () => {
	it("Successful send addUserGames request", async () => {
		const username = uuidv4();
		let token = "";
		const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });
		const { result: resultRegistration } = renderHook(() => {
			return useMutation(REGISTER, {
				client: new ApolloClient({
					link: httpLink,
					cache: new InMemoryCache(),
				}),
				context: {
					headers: {
						Authorization: "",
					},
				},
			});
		});

		await act(async () => {
			const userData = await resultRegistration.current[0]({
				variables: {
					username,
					email: username + "@gmail.com",
					password: "password",
				},
			});

			expect(userData?.data?.register?.user?.username).toEqual(username);
			token = userData?.data?.register.token;
		});

		const { result } = renderHook(() => {
			const newHttpLink = new HttpLink({
				uri: import.meta.env.VITE_BACKEND,
			});

			return useMutation(ADD_USER_GAMES, {
				client: new ApolloClient({
					link: newHttpLink,
					cache: new InMemoryCache(),
				}),
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});
		});

		await waitFor(async () => {
			const promise = result.current[0]({
				variables: {
					gameId: 2,
				},
			});
			const userGame = await promise;

			expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
		});
	});

	it("Fail send addUserGames request when the credentials fail", async () => {
		const { result } = renderHook(() => {
			const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });
			return useMutation(ADD_USER_GAMES, {
				client: new ApolloClient({
					link: httpLink,
					cache: new InMemoryCache(),
				}),
				context: {
					headers: {
						Authorization: "",
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

				expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
			});
		} catch (error: any) {
			console.log("addUserGame errors: ", error);
			expect(error.message).toEqual(
				"Response not successful: Received status code 401"
			);
		}
	});
});
