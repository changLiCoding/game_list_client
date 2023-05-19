import AllGames from '@/components/AllGames';
import FiltersWrapper from '@/components/FiltersWrapper';
import styles from '@/pages/Home/Home.module.scss';
import { useAppSelector } from '@/app/hooks';

function Home() {
  const homeSearchState = useAppSelector((state) => state.homeSearch);
  return (
    <div className={styles.homeContainer}>
      <div
        className={`${styles.gamesContainer} ${
          homeSearchState.view === 'grid' ? null : styles.listsContainer
        }`}
      >
        <FiltersWrapper />
        <AllGames />
      </div>
    </div>
  );
}

export default Home;
