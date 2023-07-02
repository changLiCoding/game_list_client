import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import {
  EDIT_USER_GAME_BY_GAME_ID,
  GET_USER_GAME_BY_GAME_ID,
} from '@/services/userGames/queries';
import { setAddedGames, setIsUserGameEdited } from '@/features/addedGamesSlice';
import { useAppSelector } from '@/app/hooks';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  EditUserGamesPayload,
  EditUserGamesInput,
} from '@/graphql/__generated__/graphql';

const useEditUserGame = () => {
  const dispatch = useDispatch();
  const { addedList } = useAppSelector((state) => state.addedGames);

  const [editUserGameRequest] = useMutation(EDIT_USER_GAME_BY_GAME_ID);

  const editUserGame = async (
    input: EditUserGamesInput
  ): Promise<EditUserGamesPayload> => {
    try {
      const response = await editUserGameRequest({
        variables: { input },
        context: getTokenFromLocalStorage(),
        refetchQueries: [
          {
            query: GET_USER_GAME_BY_GAME_ID,
            variables: { gameId: input.gameId },
            context: getTokenFromLocalStorage(),
          },
        ],
        awaitRefetchQueries: true,

        onCompleted: (data) => {
          // ADD GAME IN REDUX STORE

          if (
            data.editUserGames.userGame.game.id &&
            !addedList.includes(data.editUserGames.userGame.game.id)
          ) {
            dispatch(setIsUserGameEdited({ type: 'edit' }));
            // dispatch(
            //   setAddedGames({
            //     type: 'add',
            //     gameId: data.editUserGames.userGame.game.id,
            //   })
            // );
          }
        },
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
