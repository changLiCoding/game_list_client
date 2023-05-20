import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_GAMES } from './queries';
import type { Game as GameType } from '@/graphql/__generated__/graphql';

export default function useAllGames(
  genre: string[] = [],
  tag: string[] = [],
  platform: string[] = [],
  year = -1
) {
  let games: GameType[] = [];
  const errors: string[] = [];
  const { data: allGames, loading } = useQuery(GET_ALL_GAMES, {
    variables: {
      genre,
      tag,
      platform,
      ...(year !== -1 && { year }), // TODO: Find a better way to do this? We need to optionally include the variable if it's not -1
    },
    ...getTokenFromLocalStorage,
  });

  try {
    if (!allGames || !allGames.allGames) {
      throw new Error('No games found');
    }
    games = allGames?.allGames;
    return { games, loading, errors };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error && { games, loading, errors: [error.message] };
    }
    return { games, loading, errors: ['Unknown'] };
  }
}
