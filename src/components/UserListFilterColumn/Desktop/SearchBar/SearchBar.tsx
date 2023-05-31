import { Input } from 'antd';
import { useDispatch } from 'react-redux';
import styles from './SearchBarStyle.module.scss';
import { setUserGameFilters } from '@/app/store';

const { Search } = Input;

function SearchBar() {
  const dispatch = useDispatch();

  return (
    <Search
      className={styles.searchBar}
      placeholder="input games"
      onChange={(e) => dispatch(setUserGameFilters({ search: e.target.value }))}
      data-testid="search-bar-desktop"
    />
  );
}

export default SearchBar;
