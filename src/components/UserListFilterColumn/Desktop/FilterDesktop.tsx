import React from 'react';
import styles from './FilterDesktop.module.scss';
import SortListsWrapper from '../CommonFilters/SortLists';
import YearSlider from '../CommonFilters/YearSlider';
import SearchBar from './SearchBar';
import ListsWrapper from '@/components/UserListFilterColumn/CommonFilters/ListsWrapper';
import FilterListWrapper from '@/components/UserListFilterColumn/CommonFilters/Filters';

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
