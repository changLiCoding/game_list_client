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

function ActivityCard({
  isCurrentLiked,
  statusUpdate,
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

  const { addFollow, removeFollow } = useAddRemoveFollow();
  const { success, contextHolder, warning } = useNotification();

  const name =
    statusUpdate.userId === currentUserId ? 'You' : statusUpdate.username;

  const verb = statusUpdate.userId === currentUserId ? 'are' : 'is';

  const textGenerator = (statusUpdateInput: StatusUpdate) => {
    switch (statusUpdateInput.status) {
      case 'Playing':
        return `${name} ${verb} playing `;
      case 'Completed':
      case 'Dropped':
      case 'Paused':
        return `${name} ${statusUpdateInput.status.toLowerCase()} `;
      case 'Planning':
        return `${name} ${verb} planning to play `;
      case 'Inactive':
        return `${name} removed `;
      case null:
        return `${name} just added `;
      default:
        return `${name} `;
    }
  };

  const handleAddFollow = async (stateInput: StatusUpdate) => {
    Modal.confirm({
      title: `Are you sure you want to follow ${statusUpdate.username}?`,
      content: 'You will see their posts in your feed.',
      onOk: async () => {
        const response = await addFollow(stateInput.userId);
        if (response?.follow && response?.errors?.length === 0) {
          success(`You have followed ${stateInput.username} successfully.`);
        } else {
          warning(`Can not follow ${statusUpdate.username}. ${response}!`);
        }
      },
    });
  };

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
            <div>
              {textGenerator(statusUpdate)}
              <a
                href={`/game-detail/${statusUpdate.gameId} / ${statusUpdate.gameName}`}
              >
                {statusUpdate.gameName}
              </a>{' '}
            </div>
            <Avatar
              src={statusUpdate.userPicture}
              icon={<UserOutlined />}
              onClick={async () => {
                await handleAddFollow(statusUpdate);
              }}
            />
          </div>
        </div>
        <div className={styles.time}>
          {daysElapsed > 0 ? `${daysElapsed} days` : `${hoursElapsed} hours`}{' '}
          ago
        </div>
        <div className={styles.actions}>
          <Popover
            arrow={false}
            trigger="hover"
            content={() => likedAvatar(statusUpdate.likedUsers)}
            overlayInnerStyle={{
              backgroundColor: 'transparent',
              boxShadow: 'none',
            }}
          >
            <Button
              type="ghost"
              onClick={async () => {
                if (isCurrentLiked) {
                  await removeLike(statusUpdate.id, 'StatusUpdate');
                } else {
                  await addLike(statusUpdate.id, 'StatusUpdate');
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
              statusUpdate.likesCount === 0 && styles.zeroCount
            }`}
          >
            {statusUpdate.likesCount}
          </span>
          <div>
            <MessageOutlined />
          </div>
        </div>
      </div>
      <div className={styles.replayContainer} style={{ display: 'none' }}>
        replay
      </div>
      {contextHolder}
    </div>
  );
}

export default ActivityCard;
