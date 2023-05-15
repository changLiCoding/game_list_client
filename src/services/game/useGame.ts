import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GENRES_PLATFORMS_TAGS } from './queries';

export default function useGame() {
  const { data } = useQuery(
    GET_GENRES_PLATFORMS_TAGS,
    getTokenFromLocalStorage
  );

  const genres: string[] = data?.getGenresPlatformsTags.genres;
  const platforms: string[] = data?.getGenresPlatformsTags.platforms;
  const tags: string[] = data?.getGenresPlatformsTags.tags;

  return { genres, platforms, tags };
}
