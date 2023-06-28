import { useLazyQuery, ApolloError, gql } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/hooks';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GAME_BY_ID } from '@/services/game/queries';
import { setAddedGames } from '@/features/addedGamesSlice';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import { apolloClient } from '@/graphql';

export default function useGetGameById(): {
  getGame: (id: string) => Promise<void>;
  game: GameType;
  loading: boolean;
  error: ApolloError | undefined;
  getGameFromFragment: (gameId: string) => GameType | null;
  writeGameToFragment: (game: GameType) => void;
} {
  const dispatch = useDispatch();
  const { addedList } = useAppSelector((state) => state.addedGames);

  const [getGameRequest, { data, loading, error }] =
    useLazyQuery(GET_GAME_BY_ID);

  const getGame = async (id: string) => {
    getGameRequest({
      variables: {
        id,
      },
      context: getTokenFromLocalStorage(),
      onCompleted: (gameData) => {
        const game: GameType = gameData?.getGameById
          ? gameData.getGameById
          : null;
        if (game && game.isGameAdded && !addedList.includes(game.id)) {
          dispatch(
            setAddedGames({
              type: 'add',
              gameId: game.id,
            })
          );
        }
      },
    });
  };

  const game = data?.getGameById ? data.getGameById : null;

  const getGameFromFragment = (gameId: string): GameType | null => {
    const tempGame: GameType | null = apolloClient.readFragment({
      id: `Game:${gameId}`,
      fragment: gql`
        fragment GetAllGames on Game {
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
      `,
    });
    return tempGame;
  };

  const writeGameToFragment = (gameInput: GameType) => {
    apolloClient.writeFragment({
      id: `Game:${gameInput.id}`,
      fragment: gql`
        fragment GetAllGames on Game {
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
      `,
      data: game,
    });
  };

  return {
    getGame,
    game,
    loading,
    error,
    getGameFromFragment,
    writeGameToFragment,
  };
}
