import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { Select } from 'antd';
import styles from './FilterListWrapperStyle.module.scss';
import { useAppSelector } from '@/app/hooks';
import useGetFilters from '@/services/game/useGetFilters';
import { setUserGameFilters } from '@/app/store';

// TODO: Move into separate component
type ArrayOnly<T> = T extends any[] ? T : never;

type SelectFilterFieldType<T> =
  | {
      mode: 'multiple';
      placeholder: string;
      value: ArrayOnly<T> | undefined;
      options: string[] | number[];
      onChange: (value: T) => void;
    }
  | {
      mode: undefined;
      placeholder: string;
      value: T | undefined;
      options: string[] | number[];
      onChange: (value: T) => void;
    };

function SelectFilterField<T>({
  placeholder,
  mode,
  value,
  options,
  onChange,
}: SelectFilterFieldType<T>) {
  const optionsMemo = useMemo(() => {
    return options.map((s) => {
      return (
        <Select.Option key={s} value={s}>
          <div className={styles.option}>{s}</div>
        </Select.Option>
      );
    });
  }, [options]);

  return (
    <Select
      placeholder={placeholder}
      mode={mode}
      style={{ width: 200 }}
      className={styles.cascaderStyle}
      value={value}
      allowClear
      onChange={onChange}
    >
      {optionsMemo}
    </Select>
  );
}

function FilterList() {
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.userGameFilters);
  const { genres, platforms, tags } = useGetFilters();
  // const filterValues = useAppSelector((state) => state.userGames.filters);
  // const { filters } = useFilterOptions(genres, platforms, tags);

  // const onChange = (value: OnChangeCascaderType, fieldName: string): void => {
  //   dispatch(
  //     setFilters({
  //       type: fieldName,
  //       value: value ? (value as string[])[0] : '',
  //     })
  //   );
  // };

  return (
    <div className={styles.dropdownList}>
      <SelectFilterField<string>
        placeholder="Genres"
        mode={undefined}
        value={gameFilters.genres}
        options={genres}
        onChange={(value) => dispatch(setUserGameFilters({ genres: value }))}
      />

      <SelectFilterField<string>
        placeholder="Platforms"
        mode={undefined}
        value={gameFilters.platforms}
        options={platforms}
        onChange={(value) => dispatch(setUserGameFilters({ platforms: value }))}
      />

      <SelectFilterField<string>
        placeholder="Tags"
        mode={undefined}
        value={gameFilters.tags}
        options={tags}
        onChange={(value) => dispatch(setUserGameFilters({ tags: value }))}
      />
      {/* {filters.map((filter) => {
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
      })} */}
    </div>
  );
}

export default FilterList;
