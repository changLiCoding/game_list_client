import {
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Popover, Avatar, Modal } from 'antd';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';
import type { ActivityCardProps } from './type';
import type {
  StatusUpdate,
  User as UserType,
} from '@/graphql/__generated__/graphql';
import useAddRemoveFollow from '@/services/follows/useAddRemoveFollow';
import useNotification from '@/hooks/useNotification';
import StatusUpdateActivity from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivityCard/StatusUpdateActivity';
import PostActivity from './PostActivity';

function ActivityCard({
  isCurrentLiked,
  activity,
  daysElapsed,
  hoursElapsed,
  addLike,
  removeLike,
  currentUserId,
}: ActivityCardProps) {
  const likedAvatar = (likedUsers: UserType[]) => {
    return (
      <Avatar.Group maxCount={3}>
        {likedUsers.map((user) => (
          <Avatar
            icon={<UserOutlined />}
            key={user.id}
            src={user.userPicture}
          />
        ))}
      </Avatar.Group>
    );
  };

  return (
    <div
      className={`${styles.activity} ${
        activity.__typename === 'Post' && styles.postActivity
      }`}
    >
      <div className={styles.activityContent}>
        {activity.__typename === 'StatusUpdate' && (
          <StatusUpdateActivity
            statusUpdate={activity}
            currentUserId={currentUserId}
          />
        )}

        {activity.__typename === 'Post' && (
          <PostActivity post={activity} currentUserId={currentUserId} />
        )}
        <div className={styles.time}>
          {daysElapsed > 0 ? `${daysElapsed} days` : `${hoursElapsed} hours`}{' '}
          ago
        </div>
        <div className={styles.actions}>
          <Popover
            placement="bottom"
            arrow={false}
            trigger="hover"
            content={() => likedAvatar(activity.likedUsers as UserType[])}
            overlayInnerStyle={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
              marginTop: '-10px',
              paddingTop: '0px',
            }}
          >
            <Button
              type="ghost"
              onClick={async () => {
                if (isCurrentLiked) {
                  await removeLike(activity.id, activity.__typename as string);
                } else {
                  await addLike(activity.id, activity.__typename as string);
                }
              }}
              icon={
                isCurrentLiked ? (
                  <HeartFilled className={styles.liked} />
                ) : (
                  <HeartOutlined className={styles.notLiked} />
                )
              }
            />
          </Popover>

          <span
            className={`${styles.likeCount} ${
              activity.likesCount === 0 && styles.zeroCount
            }`}
          >
            {activity.likesCount}
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
