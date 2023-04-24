import { useMutation } from "@apollo/client";
import { AddUserGamesPayload } from "../../graphql/__generated__/graphql";
import { ADD_USER_GAME } from "./queries";

const useUserGames = () => {
	const [addUserGamesRequest] = useMutation(ADD_USER_GAME);
	const addUserGames = async (gameId: Number): Promise<AddUserGamesPayload> => {
		try {
			const response = await addUserGamesRequest({
				variables: { gameId },
			});
			if (
				!response ||
				!response.data ||
				!response.data.addUserGame ||
				response.data.addUserGame.errors[0]
			) {
				throw new Error(response.data.addUserGame.errors[0]);
			}
			console.log(response);
			return response.data.addUserGame;
		} catch (error: any) {
			return error && { errors: [error.message] };
		}
	};
	return {
		addUserGames,
	};
};

export default useUserGames;
