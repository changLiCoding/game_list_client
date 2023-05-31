import { LikeOutlined, WechatOutlined } from '@ant-design/icons';

import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';

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

  return (
    <div className={styles.activitiesUpdatesContainer}>
      {statusUpdates.length > 0 &&
        statusUpdates.map((statusUpdate) => {
          const { daysElapsed, hoursElapsed } = getTimeElapsed(
            statusUpdate.updatedAt
          );
          return (
            <div className={styles.activity} key={statusUpdate.id}>
              <div className={styles.activityContent}>
                <div className={styles.activityInfo}>
                  <a
                    href={`/game-detail/${statusUpdate.gameId}/${statusUpdate.gameName}`}
                    aria-label={`${statusUpdate.gameName}`}
                    style={{
                      textIndent: '-9999px',
                      backgroundImage: `url(${statusUpdate.imageURL})`,
                    }}
                  >
                    {statusUpdate.gameName}
                  </a>
                  <div className={styles.activityInfoText}>
                    <div>{activityGenerator(statusUpdate)}</div>
                  </div>
                </div>
                <div className={styles.time}>
                  {daysElapsed > 0
                    ? `${daysElapsed} days`
                    : `${hoursElapsed} hours`}{' '}
                  ago
                </div>
                <div className={styles.actions}>
                  <div>
                    <LikeOutlined />
                  </div>
                  <div>
                    <WechatOutlined />
                  </div>
                </div>
              </div>
              <div
                className={styles.replayContainer}
                style={{ display: 'none' }}
              >
                replay
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default ActivitiesUpdates;
