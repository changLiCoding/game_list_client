import { useMutation, useQuery } from '@apollo/client';

import { ADD_USER_GAMES, DELETE_USER_GAMES, GAMES_FOR_A_USER } from './queries';
import { getTokenFromLocalStorage } from '@/constants';
import {
  AddUserGamesPayload,
  DeleteUserGamesPayload,
} from '@/graphql/__generated__/graphql';

const useUserGames = () => {
  const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
  const [deleteUserGamesRequest] = useMutation(DELETE_USER_GAMES);
  const { loading: gamesForAUserLoading, data: gamesForAUser } = useQuery(
    GAMES_FOR_A_USER,
    { context: getTokenFromLocalStorage.context }
  );

  const addUserGames = async (gameId: number): Promise<AddUserGamesPayload> => {
    try {
      const response = await addUserGamesRequest({
        variables: { gameId },
      });
      if (
        !response ||
        !response.data ||
        !response.data.addUserGames ||
        response.data.addUserGames.errors[0]
      ) {
        console.log(
          'addUserGames from useUserGames HOOK ERRORs: ',
          response.data.addUserGames.errors[0]
        );
        throw new Error(response.data.addUserGames.errors[0]);
      }
      console.log('addUserGames response: ', response);
      return response.data.addUserGames;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error && { errors: [error.message] };
      }
      return { errors: ['Unknown'] };
    }
  };
  const deleteUserGames = async (
    gameId: number
  ): Promise<DeleteUserGamesPayload> => {
    try {
      const response = await deleteUserGamesRequest({
        variables: { gameId },
      });
      if (
        !response ||
        !response.data ||
        !response.data.deleteUserGames ||
        response.data.deleteUserGames.errors[0]
      ) {
        console.log(
          'deleteUserGames from useUserGames error: ',
          response.data.deleteUserGames.errors[0]
        );

        throw new Error(response.data.deleteUserGames.errors[0]);
      }
      console.log('deleteUserGames response: ', response);
      return response.data.deleteUserGames;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error && { errors: [error.message] };
      }
      return { errors: ['Unknown'] };
    }
  };

  return {
    addUserGames,
    deleteUserGames,
    gamesForAUser,
    gamesForAUserLoading,
  };
};

export default useUserGames;
