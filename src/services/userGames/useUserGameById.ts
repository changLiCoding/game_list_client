import { useQuery } from '@apollo/client';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserGame as UserGameType } from '@/graphql/__generated__/graphql';

const useUserGameById = (
  gameId: number
): {
  userGame: UserGameType;
  userGameLoading: boolean;
} => {
  const { loading: userGameLoading, data: userGame } = useQuery(
    GET_USER_GAME_BY_GAME_ID,
    {
      variables: { gameId },
      context: getTokenFromLocalStorage.context,
    }
  );

  console.log('userGame', userGame);

  try {
    if (!userGame || !userGame.userGame || userGame.userGame.errors[0]) {
      throw new Error('Error getting user game by id');
    }

    return {
      userGame: userGame.userGame.getUserGameByGameId,
      userGameLoading,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        userGame,
        userGameLoading,
      };
    }
    userGame.userGame.errors = ['Unknown error'];
    return {
      userGame,
      userGameLoading,
    };
  }
};

export default useUserGameById;
