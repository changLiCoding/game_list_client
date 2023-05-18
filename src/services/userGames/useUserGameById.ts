import { useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';

import { setUserGame } from '@/features/userGameSlice';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserGame as UserGameType } from '@/graphql/__generated__/graphql';

const useUserGameById = (
  gameId: string
): {
  userGame: UserGameType;
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: () => void;
} => {
  const dispatch = useDispatch();
  let userGame: UserGameType = {} as UserGameType;
  const errors: string[] = [];
  const [
    fetchUserGame,
    { loading: userGameLoading, data: userGameData, error },
  ] = useLazyQuery(GET_USER_GAME_BY_GAME_ID, {
    variables: { gameId },
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

// const useUserGameById = (
//   gameId: string
// ): {
//   userGame: UserGameType;
//   userGameLoading: boolean;
//   errors: string[];
//   fetchUserGame: () => Promise<void>;
// } => {
//   let userGame: UserGameType = {} as UserGameType;
//   const errors: string[] = [];
//   const [
//     fetchUserGameQuery,
//     { loading: userGameLoading, data: userGameData, error: queryError },
//   ] = useLazyQuery(GET_USER_GAME_BY_GAME_ID, {
//     variables: { gameId },
//     context: getTokenFromLocalStorage.context,
//     onCompleted: (data) => {
//       console.log('data on completed in hook: ', data.getUserGameByGameId);
//     },
//   });

//   const fetchUserGame = async (): Promise<void> => {
//     try {
//       await fetchUserGameQuery();
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         errors.push(error.message);
//       } else {
//         errors.push('Unknown error');
//       }
//     }
//   };

//   if (userGameData && userGameData.getUserGameByGameId) {
//     userGame = userGameData.getUserGameByGameId;
//   }

//   if (queryError) {
//     errors.push(queryError.message);
//   }

//   return {
//     userGame,
//     errors,
//     userGameLoading,
//     fetchUserGame,
//   };
// };

export default useUserGameById;
