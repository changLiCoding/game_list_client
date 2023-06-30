import {
  Layout,
  Grid,
  Input,
  Space,
  Button,
  Select,
  Popover,
  Skeleton,
} from 'antd';
import {
  DownloadOutlined,
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
import { clearCategory, setTestFilter, toggleItem } from '@/app/store';
import { range } from '@/utils/utils';
import type {
  ArrayElementType,
  SelectFilterFieldType,
} from '@/components/FiltersWrapper/types';

import ExclusionFiltersListMessage from './ExclusionFiltersListMessage';

const { Search } = Input;
const { useBreakpoint } = Grid;

function SelectFilterField<T>({
  mode,
  value,
  options,
  onClear,
  onSelect,
  onDeselect,
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
      style={{ width: 200 }}
      className={styles.cascaderStyle}
      value={value as T}
      allowClear
      onClear={onClear}
      onDeselect={(deselectedValue) =>
        onDeselect?.(deselectedValue as ArrayElementType<T> & T)
      }
      onSelect={(selectedValue) => {
        onSelect?.(selectedValue as ArrayElementType<T> & T);
      }}
      onChange={(changeValue) =>
        onChange?.(changeValue as ArrayElementType<T> & T)
      }
    >
      {optionsMemo}
    </Select>
  );
}
export default function FiltersWrapper() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  // const gameFilters = useAppSelector((state) => state.gameFilters);
  const bigTest = useAppSelector((state) => state.bigTest);

  const { data, loading } = useQuery(
    GET_GAME_FILTERS,
    getTokenFromLocalStorage
  );

  const yearOptions = useMemo(() => {
    const currentYear = Math.max(
      data?.getGameFilters.year ?? new Date().getFullYear(),
      FIRST_VIDEO_GAME_RELEASED_YEAR
    );

    const years = range(currentYear, FIRST_VIDEO_GAME_RELEASED_YEAR);
    return years;
  }, [data?.getGameFilters.year]);

  const screens = useBreakpoint();

  const content = (
    <div>
      {loading ? (
        <div className={styles.advancedSearchPopoverLoading}>
          <Skeleton paragraph={{ rows: 3, width: 600 }} active />
          <Skeleton paragraph={{ rows: 3, width: 600 }} active />
          <Skeleton paragraph={{ rows: 3, width: 600 }} active />
        </div>
      ) : (
        <>
          <ExclusionFiltersListMessage
            title="Genres"
            entries={data?.getGameFilters.genres ?? []}
            states={[
              {
                id: 'included',
                color: 'green',
                values: bigTest.genres.included || [],
              },
              {
                id: 'excluded',
                color: 'red',
                values: bigTest.genres.excluded || [],
              },
            ]}
          />

          <ExclusionFiltersListMessage
            title="Platforms"
            entries={data?.getGameFilters.platforms ?? []}
            states={[
              {
                id: 'included',
                color: 'green',
                values: bigTest.platforms.included || [],
              },
              {
                id: 'excluded',
                color: 'red',
                values: bigTest.platforms.excluded || [],
              },
            ]}
          />

          <ExclusionFiltersListMessage
            title="Tags"
            entries={data?.getGameFilters.tags ?? []}
            states={[
              {
                id: 'included',
                color: 'green',
                values: bigTest.tags.included || [],
              },
              {
                id: 'excluded',
                color: 'red',
                values: bigTest.tags.excluded || [],
              },
            ]}
          />
        </>
      )}
    </div>
  );

  if (!data || loading) return null;
  if (data.getGameFilters.errors.length > 0) {
    console.log('Errors:', data.getGameFilters.errors);
    return (
      <div>
        <p>Errors while fetching filters: {data.getGameFilters.errors[0]}</p>
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
              style={{ width: 300 }}
              size="middle"
              prefix={<SearchOutlined />}
              value={bigTest.search}
              onChange={(e) => {
                dispatch(setTestFilter({ search: e.target.value }));
              }}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={bigTest.genres.included || []}
              options={data?.getGameFilters.genres || []}
              onSelect={(v) => {
                dispatch(toggleItem({ category: 'genres', entry: v }));
              }}
              onDeselect={(v) => {
                dispatch(toggleItem({ category: 'genres', entry: v }));
              }}
              onClear={() => {
                dispatch(clearCategory('genres'));
              }}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Platforms</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={bigTest.platforms.included || []}
              options={data?.getGameFilters.platforms || []}
              onSelect={(v) => {
                dispatch(toggleItem({ category: 'platforms', entry: v }));
              }}
              onDeselect={(v) => {
                dispatch(toggleItem({ category: 'platforms', entry: v }));
              }}
              onClear={() => {
                dispatch(clearCategory('genres'));
              }}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Tags</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={bigTest.tags.included || []}
              options={data?.getGameFilters.tags || []}
              onSelect={(v) => {
                dispatch(toggleItem({ category: 'tags', entry: v }));
              }}
              onDeselect={(v) => {
                dispatch(toggleItem({ category: 'tags', entry: v }));
              }}
              onClear={() => {
                dispatch(clearCategory('tags'));
              }}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Year</h3>
            <SelectFilterField<number>
              mode={undefined}
              value={bigTest.year}
              options={yearOptions}
              onChange={(value) => {
                dispatch(setTestFilter({ year: value }));
              }}
            />
          </div>

          <div>
            <Popover
              placement="bottomRight"
              arrow={false}
              content={content}
              trigger="click"
              open={open}
              onOpenChange={(newOpen) => setOpen(newOpen)}
            >
              <Button type="primary" icon={<DownloadOutlined />} size="large" />
            </Popover>
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
    </Layout>
  );
}
