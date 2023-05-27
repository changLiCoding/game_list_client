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

const { Search } = Input;

// type InvertArrayify<T> = T extends Array<infer U> ? U : T; - Chat GPT
type InvertArrayify<T> = T extends Array<infer U> ? U[] : T;
type Arrayify<T> = T extends Array<T> ? T : [T];
type Testing<T> =
  | {
      mode: 'multiple';
      value: T extends Array<infer U> ? U[] : T[];
      options: string[]; // T extends Array<infer U> ? U[] : T[];
      onChange: (value: T) => void;
    }
  | {
      mode: undefined;
      value: T;
      options: string[]; // T[];
      onChange: (value: T) => void;
    };

function SelectFilterField<T>({ mode, value, options, onChange }: Testing<T>) {
  return (
    <Select
      mode={mode}
      style={{ width: 200 }}
      className={styles.cascaderStyle}
      value={mode === 'multiple' ? (value as any[]) : (value as any)}
      allowClear
      onChange={onChange}
    >
      {options.map((s) => {
        return (
          <Select.Option key={s} value={s}>
            <div className={styles.option}>{s}</div>
          </Select.Option>
        );
      })}
    </Select>
  );
}
export default function FiltersWrapper() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);

  const { data } = useQuery(GET_GAME_FILTERS, getTokenFromLocalStorage);
  // const filters = useNewFilterOptions(...data?.getGameFilters.genres);
  const filters = useFilterOptions(
    data?.getGameFilters.genres,
    data?.getGameFilters.platforms,
    data?.getGameFilters.tags,
    data?.getGameFilters.year
  );

  const yearOptions = useMemo(() => {
    const currentYear = Math.max(
      data?.getGameFilters.year ?? new Date().getFullYear(),
      FIRST_VIDEO_GAME_RELEASED_YEAR
    );
    const years = [];
    for (let i = currentYear; i >= FIRST_VIDEO_GAME_RELEASED_YEAR; i -= 1) {
      years.push(i.toString());
    }

    return years;
  }, [data?.getGameFilters.year]);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  if (!data) return null;
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
              onChange={(e) => {
                // TODO: Convert this into a component as the user game list will need this as well
                const value = e.target.value.trim();
                if (value.length === 0) return;
                // TODO: Will be done in another PR
              }}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.genres as string[]}
              options={data.getGameFilters.genres}
              onChange={(value) => dispatch(setGameFilters({ genres: value }))}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Platforms</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.platforms as string[]} // TODO: Add | undefined to value
              options={data.getGameFilters.platforms}
              onChange={(value) =>
                dispatch(setGameFilters({ platforms: value }))
              }
            />
          </div>
          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Tags</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.tags as string[]}
              options={data.getGameFilters.tags}
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
