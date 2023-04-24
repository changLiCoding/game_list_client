import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	useMutation,
} from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { renderHook, act } from "@testing-library/react";
import { ADD_USER_GAMES } from "../../services/userGames/queries";
import { REGISTER } from "../../services/authentication/queries";

describe("Add Game in UserGames", () => {
	const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });
	let token = "";
	it("Successful send addUserGames request", async () => {
		const username = uuidv4();
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
			return useMutation(ADD_USER_GAMES, {
				client: new ApolloClient({
					link: httpLink,
					cache: new InMemoryCache(),
				}),
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});
		});
		await act(async () => {
			const userGame = await result.current[0]({
				variables: {
					gameId: 2,
				},
			});

			expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
		});
	});

	it("should not add game in the list if the game has already been added", async () => {
		const { result } = renderHook(() => {
			return useMutation(ADD_USER_GAMES, {
				client: new ApolloClient({
					link: httpLink,
					cache: new InMemoryCache(),
				}),
				context: {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			});
		});
		await act(async () => {
			const userGame = await result.current[0]({
				variables: {
					gameId: 2,
				},
			});

			expect(userGame.data.addUserGames.userGame).toBeNull();
			expect(userGame.data.addUserGames.errors[0]).toEqual(
				"User Game already exists"
			);
		});
	});

	it("Fail send addUserGames request when the credentials fail", async () => {
		const { result } = renderHook(() => {
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
			expect(error.networkError.result.message).toEqual("Please login again");
		}
	});
});
