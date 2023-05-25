import { useMutation } from '@apollo/client';
import {
  EDIT_USER_GAME_BY_GAME_ID,
  GET_USER_GAME_BY_GAME_ID,
} from '@/services/userGames/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  EditUserGamesPayload,
  EditUserGamesInput,
} from '@/graphql/__generated__/graphql';

const useEditUserGame = () => {
  const [editUserGameRequest] = useMutation(EDIT_USER_GAME_BY_GAME_ID);

  const editUserGame = async (
    input: EditUserGamesInput
  ): Promise<EditUserGamesPayload> => {
    try {
      console.log('first-here');
      console.log('input', input);
      const response = await editUserGameRequest({
        variables: { input },
        context: getTokenFromLocalStorage.context,
        refetchQueries: [
          {
            query: GET_USER_GAME_BY_GAME_ID,
            variables: { gameId: input.gameId },
            context: getTokenFromLocalStorage.context,
          },
        ],
        awaitRefetchQueries: true,
      });

      if (
        response &&
        response.data &&
        response.data.editUserGames &&
        !response.data.editUserGames.errors[0]
      ) {
        return response.data.editUserGames;
      }
      throw new Error(response.data.editUserGames.errors[0]);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error && { errors: [error.message] };
      }
      return { errors: ['Unknown'] };
    }
  };

  return {
    editUserGame,
  };
};

export default useEditUserGame;
