import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setAddedGames } from '@/features/addedGamesSlice';
import { useAppSelector } from '@/app/hooks';

import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_GAMES } from './queries';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

export default function useAllGames(
  genre: string[] = [],
  tag: string[] = [],
  platform: string[] = [],
  year = -1
) {
  const dispatch = useDispatch();
  const { addedList } = useAppSelector((state) => state.addedGames);

  let games: GameType[] = [];
  const errors: string[] = [];
  const {
    data: allGames,
    loading,
    refetch,
  } = useQuery(GET_ALL_GAMES, {
    variables: {
      genre,
      tag,
      platform,
      year: year === -1 ? null : year,
    },
    ...getTokenFromLocalStorage,
    onCompleted: (data) => {
      console.log(data);
      const { allGames: allGamesData } = data;
      if (allGamesData) {
        allGamesData.forEach((game) => {
          if (game.isGameAdded) {
            dispatch(
              setAddedGames({
                type: 'add',
                gameId: game.id,
              })
            );
          }
        });
      }
      console.log(addedList);
    },
  });

  try {
    if (!allGames || !allGames.allGames) {
      throw new Error('No games found');
    }
    games = allGames?.allGames;
    return { games, loading, errors, refetch };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error && { games, loading, errors: [error.message] };
    }
    return { games, loading, errors: ['Unknown'], refetch };
  }
}
