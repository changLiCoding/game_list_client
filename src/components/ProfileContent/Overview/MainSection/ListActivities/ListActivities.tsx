import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ListActivities.module.scss';
import useStatusUpdates from '@/services/statusUpdate/useStatusUpdates';
import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';
import PostInput from '@/components/ProfileContent/Overview/MainSection/ListActivities/PostInput/PostInput';
import ActivitiesUpdates from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates';

function ListActivities() {
  const { statusUpdates, loading } = useStatusUpdates();
  statusUpdates && console.log(statusUpdates);

  return (
    <div className={styles.listActivitiesContainer}>
      {loading && <div>Loading...</div>}
      <h2 className={styles.title}>Activities</h2>
      <PostInput />
      <ActivitiesUpdates />
    </div>
  );
}

export default ListActivities;
