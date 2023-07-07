import ListStatistic from '@/components/ProfileContent/Overview/MainSection/ListStatistic/ListStatistic';
import styles from '@/components/ProfileContent/Overview/MainSection/MainSection.module.scss';
import type { UserGamesByStatus } from '@/graphql/__generated__/graphql';
import ListActivities from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities';
import useGlobalSocials from '@/services/social/useGlobalSocials';

function MainSection({
  gamesByStatusForAUserLoading,
  gamesByStatus,
}: {
  gamesByStatusForAUserLoading: boolean;
  gamesByStatus?: UserGamesByStatus;
}) {
  const {
    socials,
    loading: loadingSocials,
    refetch,
    fetchMore,
  } = useGlobalSocials();

  if (gamesByStatusForAUserLoading) return <div>Loading...</div>;

  return (
    <div className={styles.mainSection}>
      <ListStatistic gamesByStatus={gamesByStatus} />
      <ListActivities
        fetchLimitation={5}
        socials={socials}
        loading={loadingSocials}
        refetch={refetch}
        fetchMore={fetchMore}
      />
    </div>
  );
}

export default MainSection;
