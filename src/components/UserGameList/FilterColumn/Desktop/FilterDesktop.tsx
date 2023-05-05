import React from 'react';
import { Input } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './FilterDesktop.module.scss';
import ReorderLists from '../ReorderLists';

const { Search } = Input;

function FilterDesktop() {
  const [listStyles, setListStyles] = React.useState<boolean>(false);

  const onSearch = (value: string) => console.log(value);
  return (
    <div className={styles.FilterDesktop}>
      <Search
        className={styles.SearchBar}
        placeholder="input search text"
        onSearch={onSearch}
      />
      <div className={styles.MultiListStyle}>
        <p>Lists</p>
        {listStyles ? (
          <UpOutlined onClick={() => setListStyles((prev) => !prev)} />
        ) : (
          <DownOutlined onClick={() => setListStyles((prev) => !prev)} />
        )}
      </div>
      <div>
        <ReorderLists />
      </div>
    </div>
  );
}

export default FilterDesktop;
