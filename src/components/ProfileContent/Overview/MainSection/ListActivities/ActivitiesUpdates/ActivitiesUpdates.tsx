import type {
  StatusUpdate as StatusUpdateType,
  Post as PostType,
} from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import ActivityCard from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard';
import { useAppSelector } from '@/app/hooks';
import getTimeElapsed from '@/utils/getTimeElapsed';

function ActivitiesUpdates({
  statusUpdates,
  posts,
}: {
  statusUpdates: StatusUpdateType[];
  posts: PostType[];
}) {
  const { addLike, removeLike } = useAddRemoveLike();
  const userState = useAppSelector((state) => state.user.user);

  const { id: currentUserId } = userState;

  return (
    <div className={styles.activitiesUpdatesContainer}>
      {(statusUpdates.length > 0 || posts.length > 0) &&
        [...statusUpdates, ...posts]
          .sort((a, b) => {
            return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
          })
          .map((activity) => {
            const { daysElapsed, hoursElapsed } = getTimeElapsed(
              activity.updatedAt
            );
            const isCurrentLiked = activity.likedUsers.some(
              (user) => user.id === currentUserId
            );
            return (
              <ActivityCard
                isCurrentLiked={isCurrentLiked}
                key={`${activity.__typename}:${activity.id}`}
                activity={activity}
                daysElapsed={daysElapsed}
                hoursElapsed={hoursElapsed}
                currentUserId={currentUserId}
                addLike={addLike}
                removeLike={removeLike}
              />
            );
          })}
    </div>
  );
}

export default ActivitiesUpdates;
