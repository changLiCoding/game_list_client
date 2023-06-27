import { useQuery, QueryResult, OperationVariables } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_LIKED_GAMES } from './queries';

import type {
  Like,
  Likeable,
  GetAllLikedGamesQuery,
  Game,
} from '@/graphql/__generated__/graphql';

export default function useGetLikedGames() {
  const {
    data,
    loading,
  }: QueryResult<GetAllLikedGamesQuery, OperationVariables> = useQuery(
    GET_ALL_LIKED_GAMES,
    {
      context: getTokenFromLocalStorage(),
    }
  );
  try {
    if (!data || !data.getAllLikedGames) {
      throw new Error('Error getting liked games');
    }

    const likedGames = data.getAllLikedGames as Like[];
    return {
      likedGames,
      loading,
    };
  } catch (errors: unknown) {
    if (errors instanceof Error) {
      const likedGames = [] as Like[];
      return {
        likedGames,
        loading,
        error: errors.message,
      };
    }
  }

  return {
    likedGames: [],
    loading,
  };
}
