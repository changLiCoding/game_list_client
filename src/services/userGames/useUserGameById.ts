import { useLazyQuery } from '@apollo/client';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserGame as UserGameType } from '@/graphql/__generated__/graphql';

// const useUserGameById = () => {
//   const [fetchUserGameRequest] = useQuery(GET_USER_GAME_BY_GAME_ID);

//   const fetchUserGame = async (gameId: string) => {
//     try {
//       const response = await fetchUserGameRequest({
//         variables: { gameId },
//         context: getTokenFromLocalStorage.context,
//       });

//       if (!response || !response.userGame || response.userGame.errors[0]) {
//         throw new Error('Error getting user game by id');
//       }
//       console.log('response', response);

//       return response.data;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return error && { errors: [error.message] };
//       }
//       return { errors: ['Unknown error'] };
//     }
//   };

//   return { fetchUserGame };
// };

const useUserGameById = (
  gameId: string
): {
  userGame: UserGameType;
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: () => void;
} => {
  let userGame: UserGameType = {} as UserGameType;
  const errors: string[] = [];
  const [
    fetchUserGame,
    { loading: userGameLoading, data: userGameData, error },
  ] = useLazyQuery(GET_USER_GAME_BY_GAME_ID, {
    variables: { gameId },
    context: getTokenFromLocalStorage.context,
  });
  // variables: { gameId },

  // console.log('userGame', userGameData);

  if (userGameData && userGameData.getUserGameByGameId) {
    userGame = userGameData.getUserGameByGameId;
  }

  if (error) {
    errors.push(error.message);
  }

  return {
    userGame,
    errors,
    userGameLoading,
    fetchUserGame,
  };
};

export default useUserGameById;
