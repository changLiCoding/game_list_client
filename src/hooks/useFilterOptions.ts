import { useMemo } from 'react';
import type { Filter } from '@/components/UserListFilterColumn/Desktop/types';
import type { UseFilterOptionsType } from '@/hooks/types';
import type { DropDownOption } from '@/types/global';
import { FIRST_VIDEO_GAME_RELEASED_YEAR } from '@/constants';

const useFilterOptions = (
  genres?: string[],
  platforms?: string[],
  tags?: string[],
  year?: number
): UseFilterOptionsType => {
  const optionsGenerator = (typeArray: string[]): DropDownOption[] =>
    typeArray.map((name) => ({
      value: name,
      label: name,
    }));

  const genresOptions = useMemo(() => {
    return genres ? optionsGenerator(genres) : [];
  }, [genres]);

  const platformsOptions = useMemo(() => {
    return platforms ? optionsGenerator(platforms) : [];
  }, [platforms]);

  const tagsOptions = useMemo(() => {
    return tags ? optionsGenerator(tags) : [];
  }, [tags]);

  const yearOptions = useMemo(() => {
    const currentYear = Math.max(
      year ?? new Date().getFullYear(),
      FIRST_VIDEO_GAME_RELEASED_YEAR
    );
    const years = [];
    // 1958 is the year of the first video game
    let temp;
    for (let i = currentYear; i >= FIRST_VIDEO_GAME_RELEASED_YEAR; i -= 1) {
      temp = i.toString();
      years.push({
        value: temp,
        label: temp,
      });
    }

    return years;
  }, [year]);

  const filters: Filter[] = [
    {
      name: 'Platform',
      options: platformsOptions,
    },
    {
      name: 'Tag',
      options: tagsOptions,
    },
    {
      name: 'Genre',
      options: genresOptions,
    },
    {
      name: 'Year',
      options: yearOptions,
    },
  ];

  return { filters };
};

export default useFilterOptions;
