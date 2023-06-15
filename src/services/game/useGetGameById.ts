import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GAME_BY_ID } from '@/services/game/queries';

export default function useGetGameById(id: string) {
  const { data, loading, error } = useQuery(GET_GAME_BY_ID, {
    variables: {
      id,
    },
    context: getTokenFromLocalStorage(),
  });

  const game = data?.getGameById ? data.getGameById : null;

  return { game, loading, error };
}
