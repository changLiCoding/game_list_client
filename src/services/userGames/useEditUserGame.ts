import { useMutation } from '@apollo/client';
import { EDIT_USER_GAME_BY_GAME_ID } from '@/services/userGames/queries';
import { useAppSelector } from '@/app/hooks';
import useUserGameById from '@/services/userGames/useUserGameById';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  EditUserGamesPayload,
  EditUserGamesInput,
} from '@/graphql/__generated__/graphql';

const useEditUserGame = () => {
  const [editUserGameRequest] = useMutation(EDIT_USER_GAME_BY_GAME_ID);

  const { fetchUserGame } = useUserGameById();
  const { userGame } = useAppSelector((state) => state);

  const editUserGame = async (
    input: EditUserGamesInput
  ): Promise<EditUserGamesPayload> => {
    try {
      const response = await editUserGameRequest({
        variables: { input },
        context: getTokenFromLocalStorage.context,
        // onCompleted: async (data) => {
        //   console.log('data in useEditUserGame after compoleted: ', data);
        //   if (data.editUserGames.userGame.game.id) {
        //     await fetchUserGame({
        //       variables: { gameId: data.editUserGames.userGame.game.id },
        //     });
        //   }
        // },
      });
      console.log('UserGame in useEditUserGame', userGame);
      // if (
      //   !response ||
      //   !response.data ||
      //   !response.data.editUserGames ||
      //   response.data.editUserGames.errors[0]
      // ) {
      //   throw new Error(response.data.editUserGames.errors[0]);
      // }

      if (
        response &&
        response.data &&
        response.data.editUserGames &&
        !response.data.editUserGames.errors[0]
      ) {
        console.log(
          'response.data.editUserGames in the response of editUserGameRequest ',
          response.data.editUserGames
        );

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

  const editAndFetchUserGame = async (input: EditUserGamesInput) => {
    const editResponse = await editUserGame(input);

    if (
      editResponse &&
      editResponse.userGame &&
      editResponse.userGame.game.id
    ) {
      console.log(
        'data return from editAndFetchUserGame, editResponse.userGame.game.id: ',
        editResponse.userGame.game.id
      );

      await fetchUserGame({
        variables: { gameId: editResponse.userGame.game.id },
      });
    }
    return editResponse;
  };
  return {
    editUserGame,
    editAndFetchUserGame,
  };
};

export default useEditUserGame;
