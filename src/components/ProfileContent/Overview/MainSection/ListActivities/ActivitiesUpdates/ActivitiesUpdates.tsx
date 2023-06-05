import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import useAddRemoveLike from '@/services/like/useAddRemoveLike';
import ActivityCard from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard';
import { useAppSelector } from '@/app/hooks';

function ActivitiesUpdates({
  statusUpdates,
}: {
  statusUpdates: StatusUpdateType[];
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

  const { addLike } = useAddRemoveLike();
  const userState = useAppSelector((state) => state.user.user);

  const { id: currentUserId } = userState;

  const activityGenerator = (statusUpdate: StatusUpdateType): JSX.Element => {
    switch (statusUpdate.status) {
      case 'Playing':
        return (
          <>
            You are playing{' '}
            <a
              href={`/game-detail/${statusUpdate.gameId} / ${statusUpdate.gameName}`}
            >
              {statusUpdate.gameName}
            </a>{' '}
          </>
        );

      case 'Completed':
      case 'Dropped':
      case 'Paused':
        return (
          <>
            You {statusUpdate.status.toLowerCase()}{' '}
            <a
              href={`/game-detail/${statusUpdate.gameId}/${statusUpdate.gameName}`}
            >
              {statusUpdate.gameName}
            </a>{' '}
          </>
        );

      case 'Planning':
        return (
          <>
            You are planning to play{' '}
            <a
              href={`/game-detail/${statusUpdate.gameId}/${statusUpdate.gameName}`}
            >
              {statusUpdate.gameName}
            </a>{' '}
          </>
        );

      case 'Inactive':
        return (
          <>
            You removed{' '}
            <a
              href={`/game-detail/${statusUpdate.gameId}/${statusUpdate.gameName}`}
            >
              {statusUpdate.gameName}
            </a>{' '}
            from your list.
          </>
        );

      case null:
        return (
          <>
            You just added{' '}
            <a
              href={`/game-detail/${statusUpdate.gameId}/${statusUpdate.gameName}`}
            >
              {statusUpdate.gameName}
            </a>{' '}
            to your list!
          </>
        );

      default:
        return (
          <a
            href={`game-detail/${statusUpdate.gameId}/${statusUpdate.gameName}`}
          >
            {`${statusUpdate.gameName}`}{' '}
          </a>
        );
    }
  };
  console.log(statusUpdates);

  return (
    <div className={styles.activitiesUpdatesContainer}>
      {statusUpdates.length > 0 &&
        statusUpdates.map((statusUpdate) => {
          const { daysElapsed, hoursElapsed } = getTimeElapsed(
            statusUpdate.updatedAt
          );

          const isCurrentLiked = statusUpdate.likedUsers.some(
            (user) => user.id === currentUserId
          );

          return (
            <ActivityCard
              isCurrentLiked={isCurrentLiked}
              key={statusUpdate.id}
              statusUpdate={statusUpdate}
              daysElapsed={daysElapsed}
              hoursElapsed={hoursElapsed}
              updateText={activityGenerator(statusUpdate)}
              addLike={addLike}
            />
          );
        })}
    </div>
  );
}

export default ActivitiesUpdates;
