import { useState } from 'react';
import styles from './FilterColumn.module.scss';
import FilterDesktop from './Desktop';
import FilterMobile from './Mobile';
import YearSlider from '@/components/UserListFilterColumn/CommonFilters/YearSlider';
import SortListsWrapper from '@/components/UserListFilterColumn/CommonFilters/SortLists';
import ListsWrapper from '@/components/UserListFilterColumn/CommonFilters/ListsWrapper';
import FilterListWrapper from '@/components/UserListFilterColumn/CommonFilters/Filters';

function FilterColumn() {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <>
      <FilterDesktop />
      <FilterMobile collapsed={collapsed} setCollapsed={setCollapsed} />
      {collapsed && (
        <div className={styles.mobileDropdown}>
          <ListsWrapper />
          <FilterListWrapper />
          <YearSlider />
          <SortListsWrapper />
        </div>
      )}
    </>
  );
}

export default FilterColumn;
