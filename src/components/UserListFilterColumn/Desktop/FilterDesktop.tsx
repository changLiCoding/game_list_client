import React from 'react';
import { Input, Slider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styles from './FilterDesktop.module.scss';
import ReorderLists from './ReorderLists';
import AvailableLists from './AvailableLists';
import FilterList from './Filters';
import SortLists from './SortLists';
import ListsWrapper from './ListsWrapper/ListsWrapper';

const { Search } = Input;

function FilterDesktop() {
  const [listStyles, setListStyles] = React.useState<boolean>(false);

  const onSearch = (value: string) => {
    // console.log(value);
  };

  return (
    <div className={styles.filterDesktop}>
      <Search
        className={styles.searchBar}
        placeholder="input search text"
        onSearch={onSearch}
      />
      <div className={styles.multiListStyle}>
        <p>Lists</p>
        {listStyles ? (
          <UpOutlined onClick={() => setListStyles((prev) => !prev)} />
        ) : (
          <DownOutlined onClick={() => setListStyles((prev) => !prev)} />
        )}
      </div>
      <div className={styles.multiLists}>
        {listStyles ? <ReorderLists /> : <AvailableLists />}
      </div>
      {/* <ListsWrapper listStyles={listStyles} setListStyles={setListStyles} /> */}
      <div className={styles.multiFilterStyle}>
        <p>Filters</p>
        <FilterList />
      </div>
      <div className={styles.multiFilterStyle}>
        <p>Year</p>
        <Slider
          className={styles.slideColor}
          min={1950}
          max={2024}
          defaultValue={1950}
        />
      </div>
      <div className={styles.multiFilterStyle}>
        <p>Sort</p>
        <SortLists />
      </div>
    </div>
  );
}

export default FilterDesktop;
