import { useLazyQuery, OperationVariables } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GAME_BY_ID } from '@/services/game/queries';

export default function useGetGameById() {
  const [getGameRequest, { data, loading, error }] =
    useLazyQuery(GET_GAME_BY_ID);

  const getGame = async (id: string) => {
    getGameRequest({
      variables: {
        id,
      },
      context: getTokenFromLocalStorage(),
    });
  };

  const game = data?.getGameById ? data.getGameById : null;

  return { getGame, game, loading, error };
}
