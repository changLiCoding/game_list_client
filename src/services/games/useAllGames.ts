import { useQuery } from '@apollo/client';
import { useState } from 'react';

import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_GAMES } from './queries';
import type { Game as GameType } from '@/graphql/__generated__/graphql';
import { useAppSelector } from '@/app/hooks';

export default function useAllGames(
  genresParam?: string[],
  tagsParam?: string[],
  platformsParam?: string[],
  yearParam?: number,
  sortByParam?: string,
  searchParam?: string,
  limitParam?: number,
  offsetParam?: number
) {
  let games: GameType[] = [];
  const errors: string[] = [];

  const [tempSearch, setTempSearch] = useState<string | undefined>('');

  const tokenContext = getTokenFromLocalStorage();
  const { genres, tags, platforms, sortBy, year } = useAppSelector(
    (state) => state.homeGameFilters
  );

  const {
    data: allGames,
    loading,
    refetch,
    fetchMore,
  } = useQuery(GET_ALL_GAMES, {
    variables: {
      genre: genresParam?.length ? genresParam : genres.included,
      tag: tagsParam || tags.included,
      platform: platformsParam || platforms.included,
      year: yearParam || year,
      excludedGenres: genres.excluded,
      excludedTags: tags.excluded,
      excludedPlatforms: platforms.excluded,
      sortBy: sortByParam || sortBy,
      search: searchParam || tempSearch,
      limit: limitParam || 20,
      offset: offsetParam || 0,
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
