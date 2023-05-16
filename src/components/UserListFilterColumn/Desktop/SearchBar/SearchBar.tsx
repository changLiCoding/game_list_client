import React from 'react';
import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './SearchBarStyle.module.scss';
import { setSearch } from '@/features/userUserGamesListSlice';
import { useAppSelector } from '@/app/hooks';

const { Search } = Input;

function SearchBar() {
  const dispatch = useDispatch();
  const search = useAppSelector((state) => state.userGames.search);

  const onSearch = (value: string) => {
    dispatch(setSearch(value));
  };

  return (
    <Search
      className={styles.searchBar}
      placeholder="input games"
      onChange={(e) => onSearch(e.target.value)}
      value={search}
    />
  );
}

export default SearchBar;
