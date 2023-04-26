import { GET_ALL_GAMES } from "./queries";
import { useQuery } from "@apollo/client";
import { getTokenFromLocalStorage } from "../../constants";

export default function useAllGames() {
	const { data: allGames } = useQuery(GET_ALL_GAMES, getTokenFromLocalStorage);

	const games = allGames?.allGames;

	return { games };
}
