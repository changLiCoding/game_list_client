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
import { clearCategory, setGameFilters, toggleItem } from '@/app/store';
import { range } from '@/utils/utils';
import type { SelectFilterFieldType } from '@/components/FiltersWrapper/types';

import ExclusionFiltersListMessage from './ExclusionFiltersListMessage';
import ExclusionFiltersList3 from './ExclusionFiltersList3';

const { Search } = Input;
const { useBreakpoint } = Grid;

function SelectFilterField<T>({
  mode,
  value,
  options,
  onChange,
  onSelect,
  onDeselect,
  onClear,
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
      value={value}
      allowClear
      // onChange={(v, d) => {
      //   console.log('v = ', v);
      //   console.log('d = ', d);
      //   onChange(v);
      // }}
      onClear={onClear}
      onDeselect={(d) => {
        onDeselect(d);
      }}
      onSelect={(d) => {
        onSelect(d);
      }}
    >
      {optionsMemo}
    </Select>
  );
}
export default function FiltersWrapper() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);
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
    <>
      {loading ? (
        <div className={styles.advancedSearchPopoverLoading}>
          <Skeleton paragraph={{ rows: 3, width: 600 }} active />
          <Skeleton paragraph={{ rows: 3, width: 600 }} active />
          <Skeleton paragraph={{ rows: 3, width: 600 }} active />
        </div>
      ) : (
        <>
          <ExclusionFiltersList3
            title="Genres"
            entries={data?.getGameFilters.genres ?? []}
            included={gameFilters.genres || []}
            excluded={gameFilters.excludedGenres || []}
            states={[
              {
                id: 'included',
                color: 'green',
                values: gameFilters.genres || [],
              },
              {
                id: 'excluded',
                color: 'red',
                values: gameFilters.excludedGenres || [],
              },
            ]}
          />

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

          {/* <ExclusionFiltersList
          title="Genres"
          entries={data.getGameFilters.genres}
          onChange={(included, excluded) => {
            console.log('ExclusionFiltersList included: ', included);
            console.log('ExclusionFiltersList excluded: ', excluded);
            dispatch(
              setGameFilters({ excludedGenres: excluded, genres: included })
            );
          }}
        />

        <ExclusionFiltersList
          title="Platforms"
          entries={data.getGameFilters.platforms}
          onChange={(excluded, included) => {
            dispatch(
              setGameFilters({
                excludedPlatforms: excluded,
                platforms: included,
              })
            );
          }}
        />

        <ExclusionFiltersList
          title="Tags"
          entries={data.getGameFilters.tags}
          onChange={(excluded, included) => {
            // dispatch(setGameFilters({ excludedTags: excluded, tags: included }));
          }}
        /> */}
        </>
      )}

      {/* 
     // onChange={(state, entry) => {
      //   batch(() => {
      //     // dispatch()
      //     if (state === 'not_added') {
      //       const removedEntry = remove(gameFilters.genres, entry);
      //       dispatch(setGameFilters({ genres: removedEntry }));
      //     } else if (state === 'included') {
      //       dispatch(setGameFilters({ genres: [] }));
      //     } else if (state === 'excluded') {
      //       dispatch(setGameFilters({ genres: [] }));
      //     }
      //   });
      // }}
    
    <h3 className={filterFieldStyles.h3FilterFieldTitle}>excludedGenres</h3>
    <SelectFilterField<string[]>
      mode="multiple"
      value={gameFilters.excludedGenres || []}
      options={data?.getGameFilters.genres || []}
      onChange={(value) =>
        dispatch(setGameFilters({ excludedGenres: value }))
      }
    /> */}
    </>
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
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>
              Genres (Test)
            </h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={bigTest.genres.included || []}
              options={data?.getGameFilters.genres || []}
              onSelect={(v) => {
                console.log('onSelect', v);
                dispatch(toggleItem({ category: 'genres', entry: v }));
              }}
              onDeselect={(v) => {
                console.log('onDeselect', v);
                dispatch(toggleItem({ category: 'genres', entry: v }));
              }}
              onClear={() => {
                dispatch(clearCategory('genres'));
              }}
              // onChange={
              //   (value, option) => console.log('value-option', value, option)
              //   // dispatch(toggleItem({ category: 'genres', entry: 'Puzzle' }))
              // }
            />
          </div>
          {/* <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Search</h3>
            <Input
              allowClear
              className={styles.cascaderStyle}
              style={{ width: 300 }}
              size="middle"
              prefix={<SearchOutlined />}
              value={gameFilters.search}
              onChange={(e) => {
                dispatch(setGameFilters({ search: e.target.value }));
              }}
            />
          </div> */}

          {/* <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.genres || []}
              options={data?.getGameFilters.genres || []}
              onChange={(value) => dispatch(setGameFilters({ genres: value }))}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Platforms</h3>
            <SelectFilterField<string[]>
              mode="multiple"
              value={gameFilters.platforms || []}
              options={data?.getGameFilters.platforms || []}
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
              options={data?.getGameFilters.tags || []}
              onChange={(value) => {
                dispatch(setGameFilters({ tags: value }));
                console.log('value-option', value);
              }}
            />
          </div>

          <div>
            <h3 className={filterFieldStyles.h3FilterFieldTitle}>Year</h3>
            <SelectFilterField<number>
              mode={undefined}
              value={gameFilters.year}
              options={yearOptions}
              onChange={
                (value, option) => console.log('value-option', value, option)
                // dispatch(toggleItem({ category: 'genres', entry: 'Puzzle' }))
              }
            />
          </div>
*/}
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
