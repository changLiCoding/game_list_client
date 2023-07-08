import { useDispatch } from 'react-redux';
import { PropsWithChildren, useMemo } from 'react';
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
  ...rest
}: PropsWithChildren<SelectFilterFieldType<T>>) {
  const optionsMemo = useMemo(() => {
    return options.map((s) => {
      return (
        <Select.Option key={s} value={s}>
          <div className={styles.option} data-testid={`option-${s}`}>
            {s}
          </div>
        </Select.Option>
      );
    });
  }, [options]);

  return (
    <Select
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
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

  return (
    <div className={styles.dropdownList}>
      <SelectFilterField<string>
        data-testid="dropdown-genres"
        placeholder="Genres"
        mode={undefined}
        value={gameFilters.genres}
        options={genres}
        onChange={(value) => dispatch(setUserGameFilters({ genres: value }))}
      />

      <SelectFilterField<string>
        data-testid="dropdown-platforms"
        placeholder="Platforms"
        mode={undefined}
        value={gameFilters.platforms}
        options={platforms}
        onChange={(value) => dispatch(setUserGameFilters({ platforms: value }))}
      />

      <SelectFilterField<string>
        data-testid="dropdown-tags"
        placeholder="Tags"
        mode={undefined}
        value={gameFilters.tags}
        options={tags}
        onChange={(value) => dispatch(setUserGameFilters({ tags: value }))}
      />
    </div>
  );
}

export default FilterList;
