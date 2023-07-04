import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import {
  EDIT_USER_GAME_BY_GAME_ID,
  GET_USER_GAME_BY_GAME_ID,
  GET_GAMES_BY_STATUS,
} from '@/services/userGames/queries';
import { setIsUserGameEdited } from '@/features/addedGamesSlice';
import { useAppSelector } from '@/app/hooks';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  EditUserGamesPayload,
  EditUserGamesInput,
  UserGamesByStatus,
  Game as GameType,
} from '@/graphql/__generated__/graphql';
import { StatusType } from './useAddDeleteGame';

type GetGamesByStatusQuery = {
  gamesByStatusForAUser: UserGamesByStatus | null;
};

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
          }
        },
        update: (cache, { data }) => {
          const gamesByStatusQuery: GetGamesByStatusQuery | null =
            cache.readQuery({
              query: GET_GAMES_BY_STATUS,
            });

          const userGameAfterEdit = data.editUserGames.userGame;

          console.log('usergame input', input);

          console.log('userGameAfterEdit', userGameAfterEdit);

          console.log('gamesByStatusQuery', gamesByStatusQuery);
          if (gamesByStatusQuery?.gamesByStatusForAUser && userGameAfterEdit) {
            const gameStatusAfterEdit: StatusType | null =
              userGameAfterEdit.gameStatus?.toLowerCase();
            if (gameStatusAfterEdit) {
              cache.writeQuery({
                query: GET_GAMES_BY_STATUS,
                data: {
                  gamesByStatusForAUser: {
                    ...gamesByStatusQuery.gamesByStatusForAUser,
                    [gameStatusAfterEdit]: [
                      userGameAfterEdit.game,
                      ...(gamesByStatusQuery.gamesByStatusForAUser[
                        gameStatusAfterEdit
                      ] || []),
                    ],
                    [`${gameStatusAfterEdit}Count`]:
                      (gamesByStatusQuery?.gamesByStatusForAUser[
                        `${gameStatusAfterEdit}Count`
                      ] as number) + 1,
                    totalCount:
                      (gamesByStatusQuery.gamesByStatusForAUser
                        .totalCount as number) + 1,
                  },
                },
              });
            } else if (gameStatusAfterEdit === null) {
              cache.writeQuery({
                query: GET_GAMES_BY_STATUS,
                data: {
                  gamesByStatusForAUser: {
                    ...gamesByStatusQuery.gamesByStatusForAUser,
                    justAdded: [
                      userGameAfterEdit.game,
                      ...(gamesByStatusQuery.gamesByStatusForAUser.justAdded ||
                        []),
                    ],
                    justAddedCount:
                      (gamesByStatusQuery?.gamesByStatusForAUser
                        .justAddedCount as number) + 1,
                    totalCount:
                      (gamesByStatusQuery.gamesByStatusForAUser
                        .totalCount as number) + 1,
                  },
                },
              });
            }

            const statusKeys: StatusType[] = [
              'completed',
              'playing',
              'dropped',
              'paused',
              'planning',
              'justAdded',
            ];

            statusKeys.forEach((gamesStatusKey) => {
              if (gamesByStatusQuery?.gamesByStatusForAUser) {
                const updatedGamesByStatusForAUser = {
                  ...gamesByStatusQuery.gamesByStatusForAUser,
                  [gamesStatusKey]: gamesByStatusQuery.gamesByStatusForAUser[
                    gamesStatusKey
                  ]?.filter(
                    (game: GameType) => game.id !== userGameAfterEdit.game.id
                  ),
                };
                if (
                  updatedGamesByStatusForAUser[gamesStatusKey].length <
                  gamesByStatusQuery.gamesByStatusForAUser[gamesStatusKey]
                    .length
                ) {
                  console.log(
                    'updatedGamesByStatusForAUser',
                    updatedGamesByStatusForAUser,
                    'for status:',
                    gamesStatusKey
                  );
                  cache.writeQuery({
                    query: GET_GAMES_BY_STATUS,
                    data: {
                      gamesByStatusForAUser: {
                        ...updatedGamesByStatusForAUser,
                        [`${gamesStatusKey}Count`]:
                          (gamesByStatusQuery?.gamesByStatusForAUser[
                            `${gamesStatusKey}Count`
                          ] as number) - 1,
                        totalCount:
                          (gamesByStatusQuery.gamesByStatusForAUser
                            .totalCount as number) - 1,
                      },
                    },
                  });
                }

                // Perform additional operations here based on the updatedGamesByStatusForAUser

                // cache.writeQuery({
                //   query: GET_GAMES_BY_STATUS,
                //   data: {},
                // });
              }
            });
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
