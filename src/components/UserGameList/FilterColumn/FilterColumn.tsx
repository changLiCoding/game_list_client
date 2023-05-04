import React from 'react';
import styles from './FilterColumn.module.scss';
import FilterDesktop from './Desktop/FilterDesktop';
import FilterMobile from './Mobile/FilterMobile';

function FilterColumn() {
  return (
    <>
      <FilterDesktop />
      <FilterMobile />
    </>
  );
}

export default FilterColumn;
