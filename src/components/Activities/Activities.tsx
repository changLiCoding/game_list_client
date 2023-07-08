import useGlobalSocials from '@/services/social/useGlobalSocials';
import ListActivities from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities';

function Activities() {
  const {
    socials,
    loading: loadingSocials,
    refetch,
    fetchMore,
  } = useGlobalSocials();

  return (
    <ListActivities
      socials={socials}
      loading={loadingSocials}
      refetch={refetch}
      fetchMore={fetchMore}
      fetchLimitation={15}
    />
  );
}

export default Activities;
