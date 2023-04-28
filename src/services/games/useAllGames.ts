import { getTokenFromLocalStorage } from "@/constants";
import { GET_ALL_GAMES } from "./queries";
import { useQuery } from "@apollo/client";

export default function useAllGames() {
  const { data: allGames } = useQuery(GET_ALL_GAMES, getTokenFromLocalStorage);

  const games = allGames?.allGames;

  return { games };
}
