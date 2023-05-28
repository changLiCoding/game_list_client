import { Layout, Grid, Input, Space, Button, Select } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import styles from '@/components/FiltersWrapper/FiltersWrapper.module.scss';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';

import { useAppSelector } from '@/app/hooks';
import { GET_GAME_FILTERS } from '@/services/game/queries';
import {
  FIRST_VIDEO_GAME_RELEASED_YEAR,
  getTokenFromLocalStorage,
} from '@/constants';
import { setGameFilters } from '@/app/store';
import useFilterOptions from '@/hooks/useFilterOptions';
import { range } from '@/utils/utils';

const { Search } = Input;
const { useBreakpoint } = Grid;

type ArrayOnly<T> = T extends any[] ? T : never;

type Testing<T> =
  | {
      mode: 'multiple';
      value: ArrayOnly<T>;
      options: string[] | number[];
      onChange: (value: T) => void;
    }
  | {
      mode: undefined;
      value: T;
      options: string[] | number[];
      onChange: (value: T) => void;
    };

function SelectFilterField<T>({ mode, value, options, onChange }: Testing<T>) {
  const optionsMemo = useMemo(() => {
    return options.map((s) => {
      console.log('SelectFilterField memo running');
      return (
        <Select.Option key={s} value={s}>
          <div className={styles.option}>{s}</div>
        </Select.Option>
      );
    });
  }, [options]);

  return (
    <Select
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

// function SelectFilterField2<T>({ mode, value, options, onChange }: Testing<T>) {
//   return (
//     <Select
//       mode={mode}
//       style={{ width: 200 }}
//       className={styles.cascaderStyle}
//       value={mode === 'multiple' ? (value as any[]) : (value as any)}
//       allowClear
//       onChange={onChange}
//     >
//       {options.map((s) => {
//         return (
//           <Select.Option key={s} value={s}>
//             <div className={styles.option}>{s}</div>
//           </Select.Option>
//         );
//       })}
//     </Select>
//   );
// }

export default function FiltersWrapper() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);

  const { data, loading } = useQuery(
    GET_GAME_FILTERS,
    getTokenFromLocalStorage
  );
  // const filters = useNewFilterOptions(...data?.getGameFilters.genres);
  const filters = useFilterOptions(
    data?.getGameFilters.genres,
    data?.getGameFilters.platforms,
    data?.getGameFilters.tags,
    data?.getGameFilters.year
  );

  // const genresOptions = useMemo(() => {
  //   return (
  //     <SelectFilterField<string[]>
  //       mode="multiple"
  //       value={gameFilters.genres || []}
  //       options={data?.getGameFilters.genres || []}
  //       onChange={(value) => dispatch(setGameFilters({ genres: value }))}
  //     />
  //   );
  // }, [data?.getGameFilters.genres, dispatch, gameFilters.genres]);

  const genresOptions = useMemo(() => {
    console.log('genresOptions running');
    return data?.getGameFilters.genres ? data?.getGameFilters.genres : [];
  }, [data?.getGameFilters.genres]);

  const platformsOptions = useMemo(() => {
    console.log('platformsOptions running');
    return data?.getGameFilters.platforms ? data?.getGameFilters.platforms : [];
  }, [data?.getGameFilters.platforms]);

  const tagOptions = useMemo(() => {
    console.log('tagOptions running');
    return data?.getGameFilters.tags ? data?.getGameFilters.tags : [];
  }, [data?.getGameFilters.tags]);

  const yearOptions = useMemo(() => {
    console.log('yearOptions running');
    const currentYear = Math.max(
      data?.getGameFilters.year ?? new Date().getFullYear(),
      FIRST_VIDEO_GAME_RELEASED_YEAR
    );

    const years = range(currentYear, FIRST_VIDEO_GAME_RELEASED_YEAR);
    return years;
  }, [data?.getGameFilters.year]);

  const screens = useBreakpoint();

  if (!data || loading) return null;
  if (data.getGameFilters.errors.length > 0) {
    console.log('Errors:', data.getGameFilters.errors);
    return (
      <div>
        <p>Errors while fetching filters: {data.getGameFilters.errors[0]}</p>
      </div>
    );
  }

  console.log('filters', filters);
  console.log('gameFilters', gameFilters);
  return (
    <Layout className={styles.layoutFiltersWrapperContainer}>
      {screens.md ? (
        <div className={filterFieldStyles.layoutFilterFieldContainer}>
          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Search</h3>
            <Input
              className={styles.cascaderStyle}
              style={{ width: 300 }}
              size="middle"
              prefix={<SearchOutlined />}
              // onChange={(e) => {
              //   // TODO: Convert this into a component as the user game list will need this as well
              //   const value = e.target.value.trim();
              //   if (value.length === 0) return;
              //   // TODO: Will be done in another PR
              // }}
            />
          </div>
          {/* {genresOptions} */}
          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.genres || []}
              options={genresOptions}
              onChange={(value) => dispatch(setGameFilters({ genres: value }))}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Platforms</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.platforms || []}
              options={platformsOptions}
              onChange={(value) =>
                dispatch(setGameFilters({ platforms: value }))
              }
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Tags</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.tags || []}
              options={tagOptions}
              onChange={(value) => dispatch(setGameFilters({ tags: value }))}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Year</h3>
            <SelectFilterField<number>
              mode={undefined}
              value={gameFilters.year as number}
              options={yearOptions}
              onChange={(value) => dispatch(setGameFilters({ year: value }))}
            />
          </div>
        </div>
      ) : (
        <Space
          direction="horizontal"
          size={screens.sm ? 48 : 24}
          className={styles.spaceFiltersWrapperContainer}
        >
          <Search
            className={styles.searchFiltersWrapperSearch}
            placeholder="input search text"
            size="large"
            onSearch={() => {}}
            enterButton="Search"
          />
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            className={styles.buttonFiltersWrapperButton}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Space>
      )}
    </Layout>
  );
}
