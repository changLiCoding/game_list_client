import { useMutation } from "@apollo/client";
import {
	AddUserGamesPayload,
	DeleteUserGamesPayload,
	Game,
} from "../../graphql/__generated__/graphql";
import { ADD_USER_GAMES, DELETE_USER_GAMES, GAMES_FOR_A_USER } from "./queries";

const useUserGames = () => {
	const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
	const [deleteUserGamesRequest] = useMutation(DELETE_USER_GAMES);
	const [gamesForAUserRequest] = useMutation(GAMES_FOR_A_USER);

	const addUserGames = async (gameId: Number): Promise<AddUserGamesPayload> => {
		try {
			const response = await addUserGamesRequest({
				variables: { gameId },
			});
			if (
				!response ||
				!response.data ||
				!response.data.addUserGames ||
				response.data.addUserGames.errors[0]
			) {
				console.log(
					"addUserGames from useUserGames HOOK ERRORs: ",
					response.data.addUserGames.errors[0]
				);
				throw new Error(response.data.addUserGames.errors[0]);
			}
			console.log("addUserGames response: ", response);
			return response.data.addUserGames;
		} catch (error: any) {
			console.log("addUserGames from useUserGames HOOK ERRORs: ", error);

			return error && { errors: [error.message] };
		}
	};
	const deleteUserGames = async (
		gameId: Number
	): Promise<DeleteUserGamesPayload> => {
		try {
			const response = await deleteUserGamesRequest({
				variables: { gameId },
			});
			if (
				!response ||
				!response.data ||
				!response.data.deleteUserGames ||
				response.data.deleteUserGames.errors[0]
			) {
				console.log(
					"deleteUserGames from useUserGames error: ",
					response.data.deleteUserGames.errors[0]
				);

				throw new Error(response.data.deleteUserGames.errors[0]);
			}
			console.log("deleteUserGames response: ", response);
			return response.data.deleteUserGames;
		} catch (error: any) {
			return error && { errors: [error.message] };
		}
	};

	const gamesForAUser = async (): Promise<Array<Game>> => {
		try {
			const response = await gamesForAUserRequest();
			if (
				!response ||
				!response.data ||
				!response.data.gamesForAUser ||
				response.data.gamesForAUser.errors[0]
			) {
				console.log(
					"gamesForAUser from useUserGames error: ",
					response.data.gamesForAUser.errors[0]
				);
				throw new Error(response.data.gamesForAUser.errors[0]);
			}
			console.log("gamesForAUser response: ", response);
			return response.data.gamesForAUser;
		} catch (error: any) {
			return error && { errors: [error.message] };
		}
	};
	return {
		addUserGames,
		deleteUserGames,
		gamesForAUser,
	};
};

export default useUserGames;
