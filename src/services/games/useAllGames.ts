import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_GAMES } from './queries';

export default function useAllGames() {
  const { data: allGames, loading } = useQuery(
    GET_ALL_GAMES,
    getTokenFromLocalStorage
  );

  const games = allGames?.allGames;

  return { games, loading };
}
