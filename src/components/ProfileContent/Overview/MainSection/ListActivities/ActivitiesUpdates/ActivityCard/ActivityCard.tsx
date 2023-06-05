import { HeartFilled, HeartOutlined, MessageOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import type { ActivityCardProps } from './type';

function ActivityCard({
  isCurrentLiked,
  statusUpdate,
  daysElapsed,
  hoursElapsed,
  addLike,
  updateText,
}: ActivityCardProps) {
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
            <div>{updateText}</div>
          </div>
        </div>
        <div className={styles.time}>
          {daysElapsed > 0 ? `${daysElapsed} days` : `${hoursElapsed} hours`}{' '}
          ago
        </div>
        <div className={styles.actions}>
          <Button
            type="ghost"
            onClick={async () => addLike(statusUpdate.id, 'StatusUpdate')}
            icon={
              statusUpdate.likesCount > 0 ? (
                <HeartFilled className={styles.liked} />
              ) : (
                <HeartOutlined className={styles.notLiked} />
              )
            }
          />

          <span className={styles.likeCount}>
            {statusUpdate.likesCount > 0 ? statusUpdate.likesCount : '   '}
          </span>
          <div>
            <MessageOutlined />
          </div>
        </div>
      </div>
      <div className={styles.replayContainer} style={{ display: 'none' }}>
        replay
      </div>
    </div>
  );
}

export default ActivityCard;
