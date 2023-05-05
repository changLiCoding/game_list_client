import React from 'react';
import { Input } from 'antd';
import styles from './SearchBarStyle.module.scss';

const { Search } = Input;

function SearchBar() {
  const onSearch = (value: string) => {
    // console.log(value);
  };
  return (
    <Search
      className={styles.searchBar}
      placeholder="input games"
      onSearch={onSearch}
    />
  );
}

export default SearchBar;
