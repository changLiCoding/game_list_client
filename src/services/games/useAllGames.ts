import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_GAMES } from './queries';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import { useAppSelector } from '@/app/hooks';

export default function useAllGames() {
  let games: GameType[] = [];
  const errors: string[] = [];

  const [tempSearch, setTempSearch] = useState<string | undefined>('');

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
