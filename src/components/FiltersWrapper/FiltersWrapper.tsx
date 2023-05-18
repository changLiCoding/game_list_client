import { Layout, Grid, Input, Space, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from '@/components/FiltersWrapper/FiltersWrapper.module.scss';
import FilterField from '@/components/FiltersWrapper/FilterField';
import type { OnChangeCascaderType } from '@/types/global';
import type { FilterWrapperType } from '@/components/FiltersWrapper/types';
import useGetFilters from '@/services/game/useGetFilters';
import useFilterOptions from '@/hooks/useFilterOptions';

import { addFilter, removeFilter } from '@/features/homeSearchSlice';

const { Search } = Input;

export default function FiltersWrapper({ setTagsArr }: FilterWrapperType) {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onChange = (value: string | OnChangeCascaderType) => {
    setTagsArr((prev) => [...prev, { id: uuidv4(), value }]);
  };
  const { genres, platforms, tags } = useGetFilters();
  const { filters } = useFilterOptions(genres, platforms, tags);

  return (
    <Layout className={styles.layoutFiltersWrapperContainer}>
      {screens.md ? (
        <>
          {filters.map((filter) => {
            return (
              <FilterField
                key={filter.name}
                fieldName={filter.name}
                customCascaderStyle={styles.cascaderStyle}
                options={filter.options}
                onChange={(e, fieldName) => {
                  if (e) {
                    dispatch(
                      addFilter({
                        type: fieldName,
                        value: e,
                      })
                    );
                  } else {
                    dispatch(
                      removeFilter({
                        type: fieldName,
                      })
                    );
                  }
                }}
                changeOnSelect
              />
            );
          })}
          <FilterField
            fieldName="Year"
            options={[]}
            onChange={onChange}
            changeOnSelect
            customCascaderStyle={styles.cascaderStyle}
          />
        </>
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
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Space>
      )}
    </Layout>
  );
}
