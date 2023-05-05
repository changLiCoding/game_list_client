import React from 'react';
import styles from './FilterColumn.module.scss';
import FilterDesktop from './Desktop';
import FilterMobile from './Mobile';

function FilterColumn() {
  return (
    <>
      <FilterDesktop />
      <FilterMobile />
    </>
  );
}

export default FilterColumn;
