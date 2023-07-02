import { useMutation, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';

import {
  ADD_USER_GAMES,
  DELETE_USER_GAMES,
  GET_GAMES_BY_STATUS,
} from '@/services/userGames/queries';
import { useAppSelector } from '@/app/hooks';
import { setAddedGames } from '@/features/addedGamesSlice';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  AddUserGamesPayload,
  DeleteUserGamesPayload,
  Game,
  UserGamesByStatus,
} from '@/graphql/__generated__/graphql';

type GetGamesByStatusQuery = {
  gamesByStatusForAUser: UserGamesByStatus | null;
};

type StatusType = 'completed' | 'playing' | 'planning' | 'dropped' | 'paused';

const useAddDeleteGame = (status?: StatusType | null) => {
  const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
  const [deleteUserGamesRequest] = useMutation(DELETE_USER_GAMES);
  const dispatch = useDispatch();
  const { addedList } = useAppSelector((state) => state.addedGames);

  const addUserGames = async (gameId: string): Promise<AddUserGamesPayload> => {
    try {
      const response = await addUserGamesRequest({
        variables: { gameId },
        context: getTokenFromLocalStorage(),
        update: (cache, { data }) => {
          const newGame = data.userGame;
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
        context: getTokenFromLocalStorage(),

        update: (cache, { data }) => {
          cache.modify({
            fields: {
              userGames() {
                return data.deleteUserGames.userGame;
              },
            },
          });
          const gamesByStatusQuery: GetGamesByStatusQuery | null =
            cache.readQuery({
              query: GET_GAMES_BY_STATUS,
            });

          console.log('gamesByStatusQuery', gamesByStatusQuery);
          const deletedUserGame = data.deleteUserGames.userGame;
          console.log('deletedUserGame', deletedUserGame);

          if (gamesByStatusQuery && gamesByStatusQuery.gamesByStatusForAUser) {
            console.log(status);

            cache.writeQuery({
              query: GET_GAMES_BY_STATUS,
              data: {
                gamesByStatusForAUser: {
                  ...gamesByStatusQuery.gamesByStatusForAUser,
                  ...(status === null
                    ? {
                        justAdded:
                          gamesByStatusQuery.gamesByStatusForAUser.justAdded?.filter(
                            (game: Game) => game.id !== deletedUserGame.game.id
                          ),
                        justAddedCount: gamesByStatusQuery.gamesByStatusForAUser
                          .justAddedCount
                          ? gamesByStatusQuery.gamesByStatusForAUser
                              .justAddedCount - 1
                          : 0,
                        totalCount: gamesByStatusQuery.gamesByStatusForAUser
                          .totalCount
                          ? gamesByStatusQuery.gamesByStatusForAUser
                              .totalCount - 1
                          : 0,
                      }
                    : {
                        [status?.toLocaleLowerCase() as StatusType]:
                          gamesByStatusQuery.gamesByStatusForAUser[
                            status?.toLocaleLowerCase() as StatusType
                          ]?.filter(
                            (game: Game) => game.id !== deletedUserGame.game.id
                          ),
                        [`${status?.toLocaleLowerCase() as StatusType}Count`]:
                          gamesByStatusQuery.gamesByStatusForAUser[
                            `${status?.toLocaleLowerCase() as StatusType}Count`
                          ] ?? 0 - 1,
                        totalCount:
                          gamesByStatusQuery.gamesByStatusForAUser.totalCount ??
                          0 - 1,
                      }),
                },
              },
            });
          }
        },

        // onCompleted: (data) => {
        //   // REMOVE GAME IN REDUX STORE
        //   if (
        //     data.deleteUserGames.userGame.game.id &&
        //     addedList.includes(data.deleteUserGames.userGame.game.id)
        //   ) {
        //     dispatch(
        //       setAddedGames({
        //         type: 'remove',
        //         gameId: data.deleteUserGames.userGame.game.id,
        //       })
        //     );
        //   }
        // },
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
