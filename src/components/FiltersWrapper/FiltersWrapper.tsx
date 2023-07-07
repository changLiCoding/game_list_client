import { Layout, Grid, Input, Space, Button, Select } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@/components/FiltersWrapper/FiltersWrapper.module.scss';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';
import { useAppSelector } from '@/app/hooks';
import useGetFilters from '@/services/game/useGetFilters';
import { FIRST_VIDEO_GAME_RELEASED_YEAR } from '@/constants';
import { setGameFilters } from '@/app/store';
import { range } from '@/utils/utils';
import type { SelectFilterFieldType } from '@/components/FiltersWrapper/types';
import useNotification from '@/hooks/useNotification';

const { Search } = Input;
const { useBreakpoint } = Grid;

function SelectFilterField<T>({
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
      mode={mode}
      className={styles.cascaderStyle}
      value={value}
      allowClear
      onChange={onChange}
    >
      {optionsMemo}
    </Select>
  );
}
export default function FiltersWrapper() {
  const [collapsed, setCollapsed] = useState(false);
  const { warning, contextHolder } = useNotification();
  const { genres, platforms, tags, year, errors } = useGetFilters();

  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);

  const yearOptions = useMemo(() => {
    const currentYear = Math.max(
      year ?? new Date().getFullYear(),
      FIRST_VIDEO_GAME_RELEASED_YEAR
    );

    const years = range(currentYear, FIRST_VIDEO_GAME_RELEASED_YEAR);
    return years;
  }, [year]);

  const screens = useBreakpoint();

  if (errors.length > 0) {
    warning(`Errors: ${errors}`);
    return (
      <div>
        <p>Errors while fetching filters: {errors[0]}</p>
      </div>
    );
  }

  return (
    <Layout className={styles.layoutFiltersWrapperContainer}>
      {screens.md ? (
        <div
          aria-label="home-filter-desktop-view"
          className={filterFieldStyles.layoutFilterFieldContainer}
        >
          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Search</h3>
            <Input
              allowClear
              className={styles.cascaderStyle}
              size="middle"
              prefix={<SearchOutlined />}
              value={gameFilters.search}
              onChange={(e) => {
                dispatch(setGameFilters({ search: e.target.value }));
              }}
            />
          </div>
          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.genres || []}
              options={genres || []}
              onChange={(value) => dispatch(setGameFilters({ genres: value }))}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Platforms</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.platforms || []}
              options={platforms || []}
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
              options={tags || []}
              onChange={(value) => dispatch(setGameFilters({ tags: value }))}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Year</h3>
            <SelectFilterField<number>
              mode={undefined}
              value={gameFilters.year}
              options={yearOptions}
              onChange={(value) => dispatch(setGameFilters({ year: value }))}
            />
          </div>
        </div>
      ) : (
        <Space
          aria-label="home-filter-mobile-view"
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
      {contextHolder}
    </Layout>
  );
}
