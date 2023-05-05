import React from 'react';
import { Input } from 'antd';
import styles from './FilterDesktop.module.scss';

const { Search } = Input;

function FilterDesktop() {
  const onSearch = (value: string) => console.log(value);
  return (
    <div>
      <Search placeholder="input search text" onSearch={onSearch} />
    </div>
  );
}

export default FilterDesktop;
