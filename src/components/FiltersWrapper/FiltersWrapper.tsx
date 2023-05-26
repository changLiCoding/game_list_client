import { Layout, Grid, Input, Space, Button, Select } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/client';
import styles from '@/components/FiltersWrapper/FiltersWrapper.module.scss';
import filterFieldStyles from '@/components/FiltersWrapper/FilterField/FilterField.module.scss';

import { useAppSelector } from '@/app/hooks';
import { GET_GAME_FILTERS } from '@/services/game/queries';
import { getTokenFromLocalStorage } from '@/constants';
import { setGameFilters } from '@/app/store';

const { Search } = Input;

export default function FiltersWrapper() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const gameFilters = useAppSelector((state) => state.gameFilters);

  const { data } = useQuery(GET_GAME_FILTERS, getTokenFromLocalStorage);
  // const filters = useNewFilterOptions(...data?.getGameFilters.genres);
  // const filters = useFilterOptions(
  //   data?.getGameFilters.genres,
  //   data?.getGameFilters.platforms,
  //   data?.getGameFilters.tags,
  //   data?.getGameFilters.year
  // );

  // console.log('filters', filters);

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

  // const filtersGroup = [
  //   filters.filters,
  //   data.getGameFilters.platforms,
  //   data.getGameFilters.tags,
  //   data.getGameFilters.year,
  // ];

  console.log('gameFilters', gameFilters);
  return (
    <Layout className={styles.layoutFiltersWrapperContainer}>
      {screens.md ? (
        <div className={filterFieldStyles.layoutFilterFieldContainer}>
          <h3 className={filterFieldStyles.h3FilterFieldTitle}>Genres test</h3>
          {gameFilters.genres && (
            <Select
              mode="multiple"
              maxTagCount="responsive"
              style={{ width: 200 }}
              className={styles.cascaderStyle}
              value={gameFilters.genres ?? []}
              allowClear
              onChange={(v: string[], o) => {
                console.log('onChange', v, o);
                dispatch(setGameFilters({ genres: v }));
              }}
            >
              {data.getGameFilters.genres.map((s) => {
                return (
                  <Select.Option key={s} value={s}>
                    <div className={styles.option}>{s}</div>
                  </Select.Option>
                );
              })}
            </Select>
          )}

          {/* {filters.filters.map((filter) => {
            console.log(filter, 'filter');
            return (
              <>
                <h3 className={filterFieldStyles.h3FilterFieldTitle}>
                  {filter.name}
                </h3>
                <Select
                  key={filter.name}
                  mode="multiple"
                  maxTagCount="responsive"
                  style={{ width: 200 }}
                  className={styles.cascaderStyle}
                  value={gameFilters.genres ?? []}
                  allowClear
                  onChange={(v: string[], o) => {
                    console.log('onChange', v, o);
                    dispatch(setFilters({ genres: v }));
                  }}
                >
                  {filter.options.map((s) => {
                    // console.log(s);
                    return (
                      <Select.Option key={s.label} value={s.value}>
                        <div className={styles.option}>{s.value}</div>
                      </Select.Option>
                    );
                  })}
                </Select>
              </>
            );
          })} */}
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
