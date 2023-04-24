import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	useMutation,
} from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { renderHook, act, waitFor } from "@testing-library/react";
import useUserGames from "../../services/userGames/useUserGames";
import { ADD_USER_GAMES } from "../../services/userGames/queries";
import { REGISTER } from "../../services/authentication/queries";

describe("Add Game in UserGames", () => {
	it("Successful send addUserGames request", async () => {
		const username = uuidv4();
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
		console.log("resultRegistration: ", resultRegistration);

		await act(async () => {
			const userData = await resultRegistration.current[0]({
				variables: {
					username,
					email: username + "@gmail.com",
					password: "password",
				},
			});
			console.log("userData returned data: ", userData.data);
			expect(userData?.data?.register?.user?.username).toEqual(username);
			const token = userData?.data?.register.token;

			// const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
			const { result } = renderHook(() => {
				const newHttpLink = new HttpLink({
					uri: import.meta.env.VITE_BACKEND,
				});
				console.log("newHttpLink: ", newHttpLink);
				console.log("token: ", token);

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
			console.log("result.current: ", result.current[0]);

			await waitFor(async () => {
				result.current[0]() !== null;
				// console.log("result.current: ", result.current);
				// console.log("token", token);

				const promise = result.current[0]({
					variables: {
						gameId: 2,
					},
				});
				const userGame = await promise;
				console.log(
					"addUserGame returned should have game: ",
					userGame.data.addUserGames
				);
				expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
			});
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

		await act(async () => {
			const userGame = await result.current[0]({
				variables: {
					gameId: 2,
				},
			});
			console.log(
				"addUserGame returned without auth: ",
				userGame.data.addUserGames
			);

			expect(userGame.data.addUserGames.userGame.game.id).toEqual("2");
		});
	});
});
