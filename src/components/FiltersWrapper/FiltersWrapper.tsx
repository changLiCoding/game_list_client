import { Layout, Grid, Input, Space, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import styles from '@/components/FiltersWrapper/FiltersWrapper.module.scss';
import FilterField from '@/components/FiltersWrapper/FilterField';
import type { DropDownOption, OnChangeCascaderType } from '@/types/global';
import type { FilterWrapperType } from '@/components/FiltersWrapper/types';
import useGetFilters from '@/services/game/useGetFilters';

const { Search } = Input;

export default function FiltersWrapper({ setTagsArr }: FilterWrapperType) {
  const [collapsed, setCollapsed] = useState(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onChange = (value: string | OnChangeCascaderType) => {
    setTagsArr((prev) => [...prev, { id: uuidv4(), value }]);
  };
  const { genres, platforms, tags } = useGetFilters();

  const optionsGenerator = (typeArray: string[]): DropDownOption[] =>
    typeArray.map((name) => ({
      value: name,
      label: name,
    }));

  const genresOptions: DropDownOption[] = genres
    ? optionsGenerator(genres)
    : [];

  const platformsOptions: DropDownOption[] = platforms
    ? optionsGenerator(platforms)
    : [];

  const tagsOptions: DropDownOption[] = tags ? optionsGenerator(tags) : [];

  return tagsOptions.length === 0 ||
    genresOptions.length === 0 ||
    platformsOptions.length === 0 ? (
    <Layout>Loading</Layout>
  ) : (
    <Layout className={styles.layoutFiltersWrapperContainer}>
      {screens.md ? (
        <>
          <FilterField
            fieldName="Genres"
            customCascaderStyle={styles.cascaderStyle}
            options={genresOptions}
            onChange={onChange}
            changeOnSelect
          />

          <FilterField
            fieldName="Platforms"
            customCascaderStyle={styles.cascaderStyle}
            options={platformsOptions}
            onChange={onChange}
            changeOnSelect
          />
          <FilterField
            fieldName="Tags"
            options={tagsOptions}
            onChange={onChange}
            changeOnSelect
            customCascaderStyle={styles.cascaderStyle}
          />
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
            onSearch={() => {
              // console.log(value);
            }}
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
