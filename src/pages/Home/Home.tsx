import { useState } from 'react';

import AllGames from '@/components/AllGames';
import FiltersWrapper from '@/components/FiltersWrapper';
import styles from '@/pages/Home/Home.module.scss';
import { OnChangeCascaderType } from '@/types/global';

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
  return (
    <div className={styles.homeContainer}>
      <div className={styles.gamesContainer}>
        <FiltersWrapper setTagsArr={setTagsArr} />
        <AllGames tagsArr={tagsArr} />
      </div>
    </div>
  );
}

export default Home;
