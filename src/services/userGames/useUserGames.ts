import { useMutation } from "@apollo/client";
import { AddUserGamesPayload } from "../../graphql/__generated__/graphql";
import { ADD_USER_GAMES } from "./queries";

const useUserGames = () => {
	const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
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
				throw new Error(response.data.addUserGames.errors[0]);
			}
			console.log(response);
			return response.data.addUserGames;
		} catch (error: any) {
			return error && { errors: [error.message] };
		}
	};
	return {
		addUserGames,
	};
};

export default useUserGames;
