import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GAME_FILTERS } from './queries';

export default function useGetFilters() {
  const { data } = useQuery(GET_GAME_FILTERS, {
    context: getTokenFromLocalStorage(),
  });

  const genres: string[] = data?.getGameFilters.genres
    ? data.getGameFilters.genres
    : [];
  const platforms: string[] = data?.getGameFilters.platforms
    ? data.getGameFilters.platforms
    : [];
  const tags: string[] = data?.getGameFilters.tags
    ? data.getGameFilters.tags
    : [];
  const year: number = data?.getGameFilters.year
    ? data.getGameFilters.year
    : NaN;
  const errors: string[] = data?.getGameFilters.errors
    ? data.getGameFilters.errors
    : [];

  return { genres, platforms, tags, year, errors };
}
