import ListStatistic from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic';
import styles from '@/components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import type { UserGamesByStatus } from '@/graphql/__generated__/graphql';
import ListActivity from '@/components/ProfileContent/Overview/MainSection/ListActivity/ListActivity';

function MainSection({
  gamesByStatusForAUserLoading,
  gamesByStatus,
}: {
  gamesByStatusForAUserLoading: boolean;
  gamesByStatus?: UserGamesByStatus;
}) {
  if (gamesByStatusForAUserLoading) return <div>Loading...</div>;

  return (
    <div className={styles.mainSection}>
      <ListStatistic gamesByStatus={gamesByStatus} />
      <ListActivity />
    </div>
  );
}

export default MainSection;
