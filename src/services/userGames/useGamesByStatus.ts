import { useQuery } from '@apollo/client';
import { GET_GAMES_BY_STATUS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';

const useGamesByStatus = () => {
  const { loading: gamesByTagForAUserLoading, data: gamesByTagForAUser } =
    useQuery(GET_GAMES_BY_STATUS, {
      context: getTokenFromLocalStorage.context,
    });

  return {
    gamesByTagForAUser,
    gamesByTagForAUserLoading,
  };
};

export default useGamesByStatus;
