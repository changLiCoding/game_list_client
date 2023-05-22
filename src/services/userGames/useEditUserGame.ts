import { useMutation } from '@apollo/client';
import { EDIT_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { useAppSelector } from '@/app/hooks';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  EditUserGamesPayload,
  EditUserGamesInput,
} from '@/graphql/__generated__/graphql';

const useEditUserGame = () => {
  const [editUserGameRequest] = useMutation(EDIT_USER_GAME_BY_GAME_ID);

  const { userGame } = useAppSelector((state) => state);

  const editUserGame = async (
    input: EditUserGamesInput
  ): Promise<EditUserGamesPayload> => {
    try {
      const response = await editUserGameRequest({
        variables: { input },
        context: getTokenFromLocalStorage.context,
      });
      console.log('UserGame in useEditUserGame', userGame);
      if (
        !response ||
        !response.data ||
        !response.data.editUserGames ||
        response.data.editUserGames.errors[0]
      ) {
        throw new Error(response.data.editUserGames.errors[0]);
      }
      console.log(
        'response.data.editUserGames in the response of editUserGameRequest ',
        response.data.editUserGames
      );

      return response.data.editUserGames;
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
