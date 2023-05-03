import { useQuery } from '@apollo/client';
import { GET_GAMES_BY_STATUS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';

const useGamesByStatus = () => {
  const {
    loading: gamesByTagForAUserLoading,
    data: gamesByTagForAUser,
    refetch,
  } = useQuery(GET_GAMES_BY_STATUS, {
    context: getTokenFromLocalStorage.context,
  });

  const fetchGamesByStatus = async (status: string) => {
    const data = await refetch({ status });
    return data;
  };

  return {
    fetchGamesByStatus,
    gamesByTagForAUser,
    gamesByTagForAUserLoading,
  };
};
// const useGamesByStatus = (status: string) => {
//   const {
//     loading: gamesForAUserLoading,
//     data: gamesForAUser,
//     refetch,
//   } = useQuery(GET_GAMES_BY_STATUS, {
//     variables: { status },
//     context: getTokenFromLocalStorage.context,
//   });

//   return {
//     gamesForAUser,
//     gamesForAUserLoading,
//   };
// };

export default useGamesByStatus;
