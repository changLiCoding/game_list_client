import FiltersWrapper from '@/components/FiltersWrapper';
import styles from '@/pages/Home/Home.module.scss';
import { useAppSelector } from '@/app/hooks';
import InfoBar from '@/components/AllGames/InfoBar';
import GamesList from '@/components/AllGames/GamesList';

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
        <InfoBar />
        <GamesList />
      </div>
    </div>
  );
}

export default Home;
