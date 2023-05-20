import { OperationVariables, QueryResult, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUserGame } from '@/features/userGameSlice';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { GetUserGameByGameIdQuery } from '@/graphql/__generated__/graphql';

const useUserGameById = (): {
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: ({
    variables,
  }: {
    variables: {
      gameId: string;
    };
  }) => Promise<QueryResult<GetUserGameByGameIdQuery, OperationVariables>>;
} => {
  const dispatch = useDispatch();
  const errors: string[] = [];
  const [fetchUserGame, { loading: userGameLoading, error }] = useLazyQuery(
    GET_USER_GAME_BY_GAME_ID,
    {
      context: getTokenFromLocalStorage.context,
      onCompleted: (data) => {
        dispatch(setUserGame(data.getUserGameByGameId));
      },
    }
  );

  if (error) {
    errors.push(error.message);
  }

  return {
    errors,
    userGameLoading,
    fetchUserGame,
  };
};

export default useUserGameById;

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
