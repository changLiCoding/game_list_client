import React from 'react';
import { useDispatch } from 'react-redux';
import SelectDropdown from '@/components/SelectDropdown';
import styles from './FilterListWrapperStyle.module.scss';
import useGame from '@/services/game/useGame';
import { setFilters } from '@/features/userUserGamesListSlice';
import type { DropDownOption, OnChangeCascaderType } from '@/types/global';
import type { Filter } from '@/components/UserListFilterColumn/Desktop/types';
import { useAppSelector } from '@/app/hooks';

function FilterList() {
  const dispatch = useDispatch();
  const filterValues = useAppSelector((state) => state.userGames.filters);
  const { genres, platforms, tags } = useGame();

  // TODO: Refactor this function since FilterWrapper.tsx also uses it
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

  const onChange = (value: OnChangeCascaderType, fieldName: string): void => {
    dispatch(
      setFilters({
        type: fieldName,
        value: value ? (value as string[])[0] : '',
      })
    );
  };

  return (
    <div className={styles.dropdownList}>
      {filters.map((filter) => {
        const filterVal =
          filterValues[
            filter.name.toLowerCase() as 'platform' | 'tag' | 'genre'
          ];
        return (
          <SelectDropdown
            key={filter.name}
            customCascaderStyle={styles.cascaderStyle}
            fieldName={filter.name}
            options={filter.options}
            onChange={onChange}
            changeOnSelect
            value={filterVal ? [filterVal] : undefined}
          />
        );
      })}
    </div>
  );
}

export default FilterList;

// const filters: Filter[] = [
//   {
//     name: 'Platform',
//     options: [
//       {
//         value: 'Option1',
//         label: 'Option1',
//       },
//       {
//         value: 'Option2',
//         label: 'Option2',
//       },
//     ],
//   },
//   {
//     name: 'Status',
//     options: [
//       {
//         value: 'Status1',
//         label: 'Status1',
//       },
//       {
//         value: 'Status2',
//         label: 'Status2',
//       },
//     ],
//   },
//   {
//     name: 'Genres',
//     options: [
//       {
//         value: 'Genres1',
//         label: 'Genres1',
//       },
//       {
//         value: 'Genres2',
//         label: 'Genres2',
//       },
//     ],
//   },

//   {
//     name: 'Country',
//     options: [
//       {
//         value: 'Country1',
//         label: 'Country1',
//       },
//       {
//         value: 'Country2',
//         label: 'Country2',
//       },
//     ],
//   },
// ];
