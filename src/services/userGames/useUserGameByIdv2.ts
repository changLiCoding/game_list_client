import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { setUserGame } from '@/features/userGameSlice';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserGame as UserGameType } from '@/graphql/__generated__/graphql';

const useUserGameByIdv2 = (): {
  userGame: UserGameType;
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: any;
} => {
  const dispatch = useDispatch();
  let userGame: UserGameType = {} as UserGameType;
  const errors: string[] = [];
  const [
    fetchUserGame,
    { loading: userGameLoading, data: userGameData, error },
  ] = useLazyQuery(GET_USER_GAME_BY_GAME_ID, {
    context: getTokenFromLocalStorage.context,
    onCompleted: (data) => {
      dispatch(setUserGame(data.getUserGameByGameId));
    },
  });

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

export default useUserGameByIdv2;

// const useUserGameByIdv2 = (): {
//   userGame: UserGameType;
//   userGameLoading: boolean;
//   errors: string[];
//   fetchUserGame: () => void;
// } => {
//   const dispatch = useDispatch();
//   const { data, loading, refetch } = useQuery(
//     GET_USER_GAME_BY_GAME_ID,
//     getTokenFromLocalStorage
//   );

//   const getUserGameById = async (gameId: string, name: string) => {
//     try {
//       const response = await refetch({
//         variables: { gameId, name },
//       });
//       if (
//         !response ||
//         !response.data ||
//         !response.data.addUserGames ||
//         response.data.addUserGames.errors[0]
//       ) {
//         throw new Error(response.data.addUserGames.errors[0]);
//       }
//       return response.data.addUserGames;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         return error && { errors: [error.message] };
//       }
//       return { errors: ['Unknown'] };
//     }
//   };
// };

// export default useUserGameByIdv2;
