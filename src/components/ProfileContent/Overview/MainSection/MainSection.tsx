import ListStatistic from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic';
import styles from '@/components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import type { UserGamesType } from '@/types/global';

function MainSection({
  gamesByStatusForAUserLoading,
  gamesByStatus,
}: {
  gamesByStatusForAUserLoading: boolean;
  gamesByStatus?: UserGamesType;
}) {
  if (gamesByStatusForAUserLoading) return <div>Loading...</div>;

  return (
    <div className={styles.mainSection}>
      <ListStatistic gamesByStatus={gamesByStatus} />
      <div style={{ marginTop: '30px' }}>Game List Activity</div>
    </div>
  );
}

export default MainSection;
