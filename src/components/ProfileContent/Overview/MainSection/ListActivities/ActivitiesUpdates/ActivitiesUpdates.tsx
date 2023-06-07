import type {
  StatusUpdate as StatusUpdateType,
  Post as PostType,
} from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import ActivityCard from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard';
import { useAppSelector } from '@/app/hooks';

function ActivitiesUpdates({
  statusUpdates,
  posts,
}: {
  statusUpdates: StatusUpdateType[];
  posts: PostType[];
}) {
  function getTimeElapsed(timestamp: string) {
    const currentDate = new Date();
    const previousDate = new Date(timestamp);
    const timeDifference = currentDate.getTime() - previousDate.getTime();
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const daysElapsed = Math.floor(timeDifference / millisecondsPerDay);
    const hoursElapsed = Math.floor(
      (timeDifference % millisecondsPerDay) / (60 * 60 * 1000)
    );
    return { daysElapsed, hoursElapsed };
  }

  const { addLike, removeLike } = useAddRemoveLike();
  const userState = useAppSelector((state) => state.user.user);

  const { id: currentUserId } = userState;

  return (
    <div className={styles.activitiesUpdatesContainer}>
      {statusUpdates.length > 0 &&
        posts.length > 0 &&
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
