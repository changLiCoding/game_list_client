import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { setAddedGames } from '@/features/addedGamesSlice';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_GAMES } from './queries';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import { useAppSelector } from '@/app/hooks';

export default function useAllGames() {
  const dispatch = useDispatch();
  const { addedList } = useAppSelector((state) => state.addedGames);
  let games: GameType[] = [];
  const errors: string[] = [];

  const [tempSearch, setTempSearch] = useState<string | undefined>('');
  const userState = useAppSelector((state) => state.user);

  const tokenContext = getTokenFromLocalStorage();
  const { genres, tags, platforms, sortBy, year } = useAppSelector(
    (state) => state.gameFilters
  );
  const {
    data: allGames,
    loading,
    refetch,
    fetchMore,
  } = useQuery(GET_ALL_GAMES, {
    variables: {
      genre: genres,
      tag: tags,
      platform: platforms,
      year,
      sortBy,
      search: tempSearch,
      limit: 20,
      offset: 0,
    },
    context: tokenContext,
    onCompleted: (data) => {
      const { allGames: allGamesData } = data;

      if (allGamesData) {
        const gamesIdToAdd = allGamesData
          .filter(
            (game) =>
              userState.user.id &&
              game.isGameAdded &&
              !addedList.includes(game.id)
          )
          .map((game) => game.id);
        if (gamesIdToAdd.length > 0) {
          dispatch(
            setAddedGames({
              type: 'renew',
              gamesId: addedList.concat(gamesIdToAdd),
            })
          );
        }
      }
    },
  });

  try {
    if (!allGames || !allGames.allGames) {
      throw new Error('No games found');
    }
    games = allGames?.allGames;

    return {
      games,
      loading,
      errors,
      refetch,
      fetchMore,
      setTempSearch,
      tempSearch,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return (
        error && {
          games,
          loading,
          errors: [error.message],
          refetch,
          fetchMore,
          setTempSearch,
          tempSearch,
        }
      );
    }
    return {
      games,
      loading,
      errors: ['Unknown'],
      refetch,
      fetchMore,
      setTempSearch,
      tempSearch,
    };
  }
}
