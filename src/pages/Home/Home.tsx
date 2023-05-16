import { useState } from 'react';
import AllGames from '@/components/AllGames';
import FiltersWrapper from '@/components/FiltersWrapper';
import styles from '@/pages/Home/Home.module.scss';
import type { OnChangeCascaderType } from '@/types/global';

function Home() {
  const [tagsArr, setTagsArr] = useState<
    { id: string; value: string | OnChangeCascaderType }[]
  >([
    {
      id: '1',
      value: 'Dark Souls',
    },
    { id: '2', value: 'Dark Souls II' },
    { id: '3', value: 'Dark Souls III' },
  ]);

  const [isCardView, setIsCardView] = useState<boolean>(true);
  return (
    <div className={styles.homeContainer}>
      <div
        className={`${styles.gamesContainer} ${
          isCardView ? null : styles.listsContainer
        }`}
      >
        <FiltersWrapper setTagsArr={setTagsArr} />
        <AllGames
          tagsArr={tagsArr}
          setTagsArr={setTagsArr}
          isCardView={isCardView}
          setIsCardView={setIsCardView}
        />
      </div>
    </div>
  );
}

export default Home;
