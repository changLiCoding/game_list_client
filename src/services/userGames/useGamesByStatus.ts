import {
  useQuery,
  OperationVariables,
  ApolloQueryResult,
} from '@apollo/client';
import { GET_GAMES_BY_STATUS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserGamesByStatus } from '@/graphql/__generated__/graphql';

type UseGamesByStatusType = {
  gamesByStatusForAUser: {
    gamesByStatusForAUser: UserGamesByStatus;
  };
  gamesByStatusForAUserLoading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<{ gamesByStatusForAUser: UserGamesByStatus }>>;
};

const useGamesByStatus = (): UseGamesByStatusType => {
  const {
    loading: gamesByStatusForAUserLoading,
    data: gamesByStatusForAUser,
    refetch,
  } = useQuery(GET_GAMES_BY_STATUS, {
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
    console.log('gamesByStatusForAUser', gamesByStatusForAUser);

    return {
      refetch,
      gamesByStatusForAUser,
      gamesByStatusForAUserLoading,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        refetch,
        gamesByStatusForAUser,
        gamesByStatusForAUserLoading,
      };
    }
    gamesByStatusForAUser.gamesByStatusForAUser.errors = ['Unknown error'];
    return {
      refetch,
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
