import React, { useState } from 'react';
import { Button, Space, Input } from 'antd';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import styles from './FilterMobile.module.scss';
import { setSearch } from '@/features/userUserGamesListSlice';
import { useAppSelector } from '@/app/hooks';

const { Search } = Input;

function FilterMobile({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useDispatch();
  const search = useAppSelector((state) => state.userGames.search);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
  };

  return (
    <Space direction="horizontal" className={styles.mobileSearchFieldWrapper}>
      <Search
        className={styles.mobileSearchField}
        placeholder="search games"
        size="large"
        onChange={(e) => onSearch(e.target.value)}
        enterButton="Search"
        value={search}
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
