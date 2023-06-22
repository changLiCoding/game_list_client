import { OperationVariables, QueryResult, useLazyQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setUserGameReducer } from '@/features/userGameSlice';
import { GET_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { useAppSelector } from '@/app/hooks';
import {
  getTokenFromLocalStorage,
  INITIAL_USER_GAME_BY_ID_STATE,
} from '@/constants';
import type { GetUserGameByGameIdQuery } from '@/graphql/__generated__/graphql';

type UseUserGameByIdType = {
  userGameLoading: boolean;
  errors: string[];
  fetchUserGame: ({
    variables,
  }: {
    variables: {
      gameId: string;
    };
  }) => Promise<QueryResult<GetUserGameByGameIdQuery, OperationVariables>>;
};

const useUserGameById = (): UseUserGameByIdType => {
  const dispatch = useDispatch();
  const userState = useAppSelector((state) => state.user);
  const errors: string[] = [];
  const [fetchUserGame, { loading: userGameLoading, error }] = useLazyQuery(
    GET_USER_GAME_BY_GAME_ID,
    {
      context: getTokenFromLocalStorage(),
      onCompleted: (data) => {
        // When user game is not found, clear out redux slice

        if (data.getUserGameByGameId && userState.user.id !== '') {
          dispatch(
            setUserGameReducer({
              type: 'userGame',
              payload: data.getUserGameByGameId,
            })
          );
        } else {
          dispatch(
            setUserGameReducer({
              type: 'userGame',
              payload: INITIAL_USER_GAME_BY_ID_STATE,
            })
          );
        }
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
