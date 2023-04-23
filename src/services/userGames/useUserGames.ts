import { apolloClient } from "../../graphql";
import { AddUserGamesPayload } from "../../graphql/__generated__/graphql";
import { ADD_USER_GAME } from "./queries";

const useUserGames = () => {
	const addUserGames = async (gameId: Number): Promise<AddUserGamesPayload> => {
		try {
			const response = await apolloClient.mutate({
				mutation: ADD_USER_GAME,
				variables: { gameId },
			});
			console.log(response.data);
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
