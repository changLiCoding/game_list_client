import { useDispatch } from 'react-redux';
import SelectDropdown from '@/components/SelectDropdown';
import styles from './FilterListWrapperStyle.module.scss';
import { setFilters } from '@/features/userUserGamesListSlice';
import type { OnChangeCascaderType } from '@/types/global';
import { useAppSelector } from '@/app/hooks';
import useGetFilters from '@/services/game/useGetFilters';
import useFilterOptions from '@/hooks/useFilterOptions';

function FilterList() {
  const dispatch = useDispatch();
  const filterValues = useAppSelector((state) => state.userGames.filters);
  const { genres, platforms, tags } = useGetFilters();
  const { filters } = useFilterOptions(genres, platforms, tags);

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
