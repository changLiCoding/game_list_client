import type { Filter } from '@/components/UserListFilterColumn/Desktop/types';
import type { UseFilterOptionsType } from '@/hooks/types';
import type { DropDownOption } from '@/types/global';

const useFilterOptions = (
  genres: string[],
  platforms: string[],
  tags: string[]
): UseFilterOptionsType => {
  const optionsGenerator = (typeArray: string[]): DropDownOption[] =>
    typeArray.map((name) => ({
      value: name,
      label: name,
    }));

  const genresOptions: DropDownOption[] = genres
    ? optionsGenerator(genres)
    : [];

  const platformsOptions: DropDownOption[] = platforms
    ? optionsGenerator(platforms)
    : [];

  const tagsOptions: DropDownOption[] = tags ? optionsGenerator(tags) : [];

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
  ];

  return { filters };
};

export default useFilterOptions;
