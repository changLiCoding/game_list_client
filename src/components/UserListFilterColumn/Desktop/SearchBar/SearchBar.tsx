import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './SearchBarStyle.module.scss';
import { setSearch } from '@/features/userUserGamesListSlice';

const { Search } = Input;

function SearchBar() {
  const dispatch = useDispatch();

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
  };

  return (
    <Search
      className={styles.searchBar}
      placeholder="input games"
      // onSearch={onSearch}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;
