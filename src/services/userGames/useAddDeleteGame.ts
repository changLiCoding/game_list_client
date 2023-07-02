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

const useAddDeleteGame = () => {
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
          const previousUserGame = cache.readFragment({
            id: `UserGame:${data.deleteUserGames.userGame.id}`,
            fragment: gql`
              fragment PreviousUserGame on UserGame {
                id
                gameNote
                gameStatus
                startDate
                completedDate
                rating
                private
                createdAt
                updatedAt
                game {
                  id
                  name
                  description
                  bannerURL
                  imageURL
                  releaseDate
                  avgScore
                  totalRating
                  genres
                  tags
                  platforms
                  isGameAdded
                  isGameLiked
                }
              }
            `,
          });
          console.log('previousUserGame', previousUserGame);

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
            cache.writeQuery({
              query: GET_GAMES_BY_STATUS,
              data: {
                gamesByStatusForAUser: {
                  ...gamesByStatusQuery.gamesByStatusForAUser,
                  [deletedUserGame.status]: [
                    ...gamesByStatusQuery.gamesByStatusForAUser[
                      deletedUserGame.status
                    ].filter(
                      (game: Game) => game.id !== deletedUserGame.game.id
                    ),
                  ],
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
