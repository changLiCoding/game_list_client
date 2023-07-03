import { useMutation } from '@apollo/client';

import {
  ADD_USER_GAMES,
  DELETE_USER_GAMES,
  GET_GAMES_BY_STATUS,
} from '@/services/userGames/queries';
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

export type StatusType =
  | 'completed'
  | 'playing'
  | 'planning'
  | 'dropped'
  | 'paused';

const useAddDeleteGame = (status?: StatusType | null) => {
  const [addUserGamesRequest] = useMutation(ADD_USER_GAMES);
  const [deleteUserGamesRequest] = useMutation(DELETE_USER_GAMES);

  const addUserGames = async (gameId: string): Promise<AddUserGamesPayload> => {
    try {
      const response = await addUserGamesRequest({
        variables: { gameId },
        context: getTokenFromLocalStorage(),
        update: (cache, { data }) => {
          const newGame = data.addUserGames.userGame;
          console.log('newGame', newGame);
          const gamesByStatusQuery: GetGamesByStatusQuery | null =
            cache.readQuery({
              query: GET_GAMES_BY_STATUS,
            });
          console.log('gamesByStatusQuery', gamesByStatusQuery);

          if (
            gamesByStatusQuery &&
            gamesByStatusQuery.gamesByStatusForAUser &&
            newGame
          ) {
            cache.writeQuery({
              query: GET_GAMES_BY_STATUS,
              data: {
                gamesByStatusForAUser: {
                  ...gamesByStatusQuery.gamesByStatusForAUser,
                  justAdded: [
                    newGame.game,
                    ...(gamesByStatusQuery.gamesByStatusForAUser.justAdded ||
                      []),
                  ],
                  justAddedCount: gamesByStatusQuery.gamesByStatusForAUser
                    .justAddedCount
                    ? gamesByStatusQuery.gamesByStatusForAUser.justAddedCount +
                      1
                    : 1,
                },
              },
            });
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
        context: getTokenFromLocalStorage(),

        update: (cache, { data }) => {
          cache.modify({
            fields: {
              userGames() {
                return data.deleteUserGames.userGame;
              },
            },
          });
          // UPDATE GETGAMESBYSTATUS QUERY WHEN REMOVE GAME FROM LIST
          const gamesByStatusQuery: GetGamesByStatusQuery | null =
            cache.readQuery({
              query: GET_GAMES_BY_STATUS,
            });

          const deletedUserGame = data.deleteUserGames.userGame;

          if (gamesByStatusQuery && gamesByStatusQuery.gamesByStatusForAUser) {
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
