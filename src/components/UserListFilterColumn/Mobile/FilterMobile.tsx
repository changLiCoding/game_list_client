import React, { useState } from 'react';
import { Button, Space, Input } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import styles from './FilterMobile.module.scss';

const { Search } = Input;

function FilterMobile() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Space direction="horizontal" className={styles.mobileSearchFieldWrapper}>
      <Search
        className={styles.mobileSearchField}
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
          setCollapsed(!collapsed);
        }}
      >
        {collapsed ? <CloseOutlined /> : <MenuOutlined />}
      </Button>
    </Space>
  );
}

export default FilterMobile;
