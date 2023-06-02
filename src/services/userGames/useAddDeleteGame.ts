import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';

import {
  ADD_USER_GAMES,
  DELETE_USER_GAMES,
} from '@/services/userGames/queries';
import { useAppSelector } from '@/app/hooks';
import { setAddedGames } from '@/features/addedGamesSlice';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  AddUserGamesPayload,
  DeleteUserGamesPayload,
} from '@/graphql/__generated__/graphql';

const useAddDeleteGame = () => {
  const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
  const [deleteUserGamesRequest] = useMutation(DELETE_USER_GAMES);
  const dispatch = useDispatch();
  const { addedList } = useAppSelector((state) => state.addedGames);

  const addUserGames = async (gameId: string): Promise<AddUserGamesPayload> => {
    try {
      const response = await addUserGamesRequest({
        variables: { gameId },
        context: getTokenFromLocalStorage.context,
        // refetchQueries: [
        //   {
        //     query: GET_USER_GAME_BY_GAME_ID,
        //     variables: { gameId },
        //     context: getTokenFromLocalStorage.context,
        //   },
        // ],
        // awaitRefetchQueries: true,
        onCompleted: (data) => {
          // ADD GAME IN REDUX STORE
          if (
            data.addUserGames.userGame.game.id &&
            !addedList.includes(data.addUserGames.userGame.game.id)
          ) {
            dispatch(
              setAddedGames({
                type: 'add',
                gameId: data.addUserGames.userGame.game.id,
              })
            );
          }
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
        // refetchQueries: [
        //   {
        //     query: GET_USER_GAME_BY_GAME_ID,
        //     variables: { gameId },
        //     context: getTokenFromLocalStorage.context,
        //   },
        // ],
        // awaitRefetchQueries: true,

        onCompleted: (data) => {
          // REMOVE GAME IN REDUX STORE
          if (
            data.deleteUserGames.userGame.game.id &&
            addedList.includes(data.deleteUserGames.userGame.game.id)
          ) {
            dispatch(
              setAddedGames({
                type: 'remove',
                gameId: data.deleteUserGames.userGame.game.id,
              })
            );
          }
        },
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
