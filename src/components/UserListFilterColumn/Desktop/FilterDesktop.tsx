import React from 'react';
import styles from './FilterDesktop.module.scss';
import SortListsWrapper from './SortLists';
import FilterListWrapper from './Filters';
import YearSlider from './YearSlider';
import ListsWrapper from './ListsWrapper';
import SearchBar from './SearchBar';

function FilterDesktop() {
  return (
    <div className={styles.filterDesktop}>
      <SearchBar />
      <ListsWrapper />
      <FilterListWrapper />
      <YearSlider />
      <SortListsWrapper />
    </div>
  );
}

export default FilterDesktop;
