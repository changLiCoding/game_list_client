import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	useMutation,
} from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { renderHook, act } from "@testing-library/react";
import {
	DELETE_USER_GAMES,
	ADD_USER_GAMES,
} from "../../services/userGames/queries";
import { REGISTER } from "../../services/authentication/queries";

const httpLink = new HttpLink({ uri: import.meta.env.VITE_BACKEND });

describe("Delete Game in UserGames", () => {
	it("Successful send deleteUserGames request", async () => {
		const username = uuidv4();
		let token = "";
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
			console.log("userData returned data: ", userData.data);
			expect(userData?.data?.register?.user?.username).toEqual(username);
			token = userData?.data?.register.token;
		});

		const { result: resultAddUserGames } = renderHook(() => {
			console.log("token: ", token);

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
			const userGame = await resultAddUserGames.current[0]({
				variables: {
					gameId: 1,
				},
			});
			expect(userGame.data.addUserGames.userGame.game.id).toEqual("1");
		});

		const { result: resultDeleteUserGames } = renderHook(() => {
			return useMutation(DELETE_USER_GAMES, {
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
			const userGame = await resultDeleteUserGames.current[0]({
				variables: {
					gameId: 1,
				},
			});
			expect(userGame.data.deleteUserGames.userGame.game.id).toEqual("1");
		});
	});

	it.skip("Fail send deleteUserGames request when the credentials fail", async () => {
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
				const userGame = await result.current[0]({ variables: { gameId: 1 } });
				console.log(
					"deleteUserGame no auth returned Game: ",
					userGame.data.deleteUserGames
				);
				expect(userGame.data.deleteUserGames.userGame.game.id).toEqual("2");
			});
		} catch (error: any) {
			expect(error.networkError.result.message).toEqual("Please login again");
		}
	});
});
