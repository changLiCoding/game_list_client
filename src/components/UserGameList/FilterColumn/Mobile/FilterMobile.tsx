import React, { useState } from 'react';
import { Button, Space, Input } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import styles from './FilterMobile.module.scss';

const { Search } = Input;

function FilterMobile() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Space
      direction="horizontal"
      className={styles.spaceFiltersWrapperContainer}
    >
      <Search
        // className={styles.searchFiltersWrapperSearch}
        placeholder="input search text"
        size="large"
        onSearch={(value) => {
          // console.log(value);
        }}
        enterButton="Search"
      />
      <Button
        size="large"
        type="primary"
        onClick={() => {
          console.log('first');
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    </Space>
  );
}

export default FilterMobile;
