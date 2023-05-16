import { useQuery } from '@apollo/client';
import { GET_GAMES_BY_STATUS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';
import { UserGamesByStatus } from '@/graphql/__generated__/graphql';

const useGamesByStatus = (): {
  gamesByStatusForAUser: {
    gamesByStatusForAUser: UserGamesByStatus;
  };
  gamesByStatusForAUserLoading: boolean;
} => {
  const { loading: gamesByStatusForAUserLoading, data: gamesByStatusForAUser } =
    useQuery(GET_GAMES_BY_STATUS, {
      context: getTokenFromLocalStorage.context,
    });

  try {
    if (
      !gamesByStatusForAUser ||
      !gamesByStatusForAUser.gamesByStatusForAUser ||
      gamesByStatusForAUser.gamesByStatusForAUser.errors[0]
    ) {
      throw new Error('Error getting games by status');
    }

    return {
      gamesByStatusForAUser,
      gamesByStatusForAUserLoading,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        gamesByStatusForAUser,
        gamesByStatusForAUserLoading,
      };
    }
    gamesByStatusForAUser.gamesByStatusForAUser.errors = ['Unknown error'];
    return {
      gamesByStatusForAUser,
      gamesByStatusForAUserLoading,
    };
  }
};

export default useGamesByStatus;

// import { useQuery } from '@apollo/client';
// import { GET_GAMES_BY_STATUS } from './queries';
// import { getTokenFromLocalStorage } from '@/constants';

// const useGamesByStatus = () => {
//   const { loading: gamesByStatusForAUserLoading, data: gamesByStatusForAUser } =
//     useQuery(GET_GAMES_BY_STATUS, {
//       context: getTokenFromLocalStorage.context,
//     });

//   return {
//     gamesByStatusForAUser,
//     gamesByStatusForAUserLoading,
//   };
// };

// export default useGamesByStatus;
