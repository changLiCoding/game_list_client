import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import {
  ADD_USER_GAMES,
  DELETE_USER_GAMES,
} from '@/services/userGames/queries';
import {
  getTokenFromLocalStorage,
  INITIAL_USER_GAME_BY_ID_STATE,
} from '@/constants';
import { useAppSelector } from '@/app/hooks';
import useEditUserGame from '@/services/userGames/useEditUserGame';
import { setUserGame } from '@/features/userGameSlice';
import type {
  AddUserGamesPayload,
  DeleteUserGamesPayload,
} from '@/graphql/__generated__/graphql';

const useAddDeleteGame = () => {
  const dispatch = useDispatch();

  const { editUserGame } = useEditUserGame();

  const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
  const [deleteUserGamesRequest] = useMutation(DELETE_USER_GAMES);

  const { userGame } = useAppSelector((state) => state);
  const addUserGames = async (gameId: string): Promise<AddUserGamesPayload> => {
    try {
      const response = await addUserGamesRequest({
        variables: { gameId },
        context: getTokenFromLocalStorage.context,
        onCompleted: async (data) => {
          console.log(
            'addUserGamesRequest onCompleted log: data.addUserGames.userGame',
            data.addUserGames.userGame
          );
          // if (data.addUserGames.errors.length > 0) {
          //   throw new Error(data.addUserGames.errors[0]);
          // }
          if (data.addUserGames.userGame) {
            console.log('editUserGame in addUserGamesRequest: ', {
              ...userGame,
              gameId: data.addUserGames.userGame.game.id,
            });

            // await editUserGame({
            //   ...userGame,
            //   gameId: data.addUserGames.userGame.game.id,
            // });
          }

          console.log(
            'addUserGamesRequest onCompleted log: userGame',
            userGame
          );
        },
      });
      if (
        !response ||
        !response.data ||
        !response.data.addUserGames ||
        response.data.addUserGames.errors[0]
      ) {
        throw new Error(response.data.addUserGames.errors[0]);
      }

      // dispatch(setUserGame(response.data.addUserGames.userGame));
      console.log(
        'userGame log in useAddDeleteGame after mutation: ',
        userGame
      );
      console.log(
        'response.data.addUserGames.userGame',
        response.data.addUserGames.userGame
      );

      return response.data.addUserGames;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return error && { errors: [error.message] };
      }
      return { errors: ['Unknown'] };
    }
  };

  const deleteUserGames = async (
    gameId: string
  ): Promise<DeleteUserGamesPayload> => {
    try {
      const response = await deleteUserGamesRequest({
        variables: { gameId },
        context: getTokenFromLocalStorage.context,
      });
      if (
        !response ||
        !response.data ||
        !response.data.deleteUserGames ||
        response.data.deleteUserGames.errors[0]
      ) {
        throw new Error(response.data.deleteUserGames.errors[0]);
      }

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
  };
};

export default useAddDeleteGame;
