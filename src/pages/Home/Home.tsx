import AllGames from '@/components/AllGames';
import FiltersWrapper from '@/components/FiltersWrapper';
import styles from '@/pages/Home/Home.module.scss';

function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.gamesContainer}>
        <FiltersWrapper />
        <AllGames />
      </div>
    </div>
  );
}

export default Home;
