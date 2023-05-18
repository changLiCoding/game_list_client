import { useLazyQuery } from '@apollo/client';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserGame as UserGameType } from '@/graphql/__generated__/graphql';

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
//     fetchUserGame,
//     { loading: userGameLoading, data: userGameData, error },
//   ] = useLazyQuery(GET_USER_GAME_BY_GAME_ID, {
//     variables: { gameId },
//     context: getTokenFromLocalStorage.context,
//   });
//   // variables: { gameId },

//   // console.log('userGame', userGameData);

//   if (userGameData && userGameData.getUserGameByGameId) {
//     userGame = userGameData.getUserGameByGameId;
//   }

//   if (error) {
//     errors.push(error.message);
//   }

//   return {
//     userGame,
//     errors,
//     userGameLoading,
//     fetchUserGame,
//   };
// };

const useUserGameById = (
  gameId: string
): {
  userGame: UserGameType;
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: () => Promise<void>;
} => {
  let userGame: UserGameType = {} as UserGameType;
  const errors: string[] = [];
  const [
    fetchUserGameQuery,
    { loading: userGameLoading, data: userGameData, error: queryError },
  ] = useLazyQuery(GET_USER_GAME_BY_GAME_ID, {
    variables: { gameId },
    context: getTokenFromLocalStorage.context,
  });

  const fetchUserGame = async (): Promise<void> => {
    try {
      await fetchUserGameQuery();
    } catch (error: unknown) {
      if (error instanceof Error) {
        errors.push(error.message);
      } else {
        errors.push('Unknown error');
      }
    }
  };

  if (userGameData && userGameData.getUserGameByGameId) {
    userGame = userGameData.getUserGameByGameId;
  }

  if (queryError) {
    errors.push(queryError.message);
  }

  return {
    userGame,
    errors,
    userGameLoading,
    fetchUserGame,
  };
};

export default useUserGameById;
