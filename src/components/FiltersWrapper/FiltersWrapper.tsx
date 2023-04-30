import { Layout, Grid, Input, Space, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useState } from 'react';

import './FiltersWrapper.scss';
import FilterField from './FilterField';
import useGame from '@/services/game/useGame';

interface Option {
  value: string;
  label: string;
  children?: Option[];
}

const { Search } = Input;

export default function FilterWrapper() {
  const [collapsed, setCollapsed] = useState(false);

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const onChange = (value: string[]): void => {
    console.log(value);
  };
  const { genres, platforms, tags } = useGame();

  const optionsGenerator = (typeArray: Array<{ name: string }>): Option[] =>
    typeArray.map((type: { name: string }) => ({
      value: type.name,
      label: type.name,
    }));

  const genresOptions: Option[] = genres ? optionsGenerator(genres) : [];

  const platformsOptions: Option[] = platforms
    ? optionsGenerator(platforms)
    : [];

  const tagsOptions: Option[] = tags ? optionsGenerator(tags) : [];

  return tagsOptions.length === 0 ||
    genresOptions.length === 0 ||
    platformsOptions.length === 0 ? (
    <Layout>Loading</Layout>
  ) : (
    <Layout className="layout-FiltersWrapper-container">
      {screens.md ? (
        <>
          <FilterField
            fieldName="Genres"
            options={genresOptions}
            onChange={onChange}
            changeOnSelect
          />

          <FilterField
            fieldName="Platforms"
            options={platformsOptions}
            onChange={onChange}
            changeOnSelect
          />
          <FilterField
            fieldName="Tags"
            options={tagsOptions}
            onChange={onChange}
            changeOnSelect
          />
          <FilterField
            fieldName="Year"
            options={[]}
            onChange={onChange}
            changeOnSelect
          />
        </>
      ) : (
        <Space direction="horizontal" size={screens.sm ? 48 : 24}>
          <Search
            style={screens.sm ? { width: '470px' } : { width: '300px' }}
            placeholder="input search text"
            size="large"
            onSearch={(value) => console.log(value)}
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
