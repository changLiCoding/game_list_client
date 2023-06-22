import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';
import useAddRemoveFollowCustomHook from '@/hooks/useAddRemoveFollowCustomHook';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';

function StatusUpdateActivity({
  statusUpdate,
  currentUserId,
}: {
  statusUpdate: StatusUpdateType;
  currentUserId: string;
}) {
  const { handleAddFollow, contextHolder: handleFollowContextHolder } =
    useAddRemoveFollowCustomHook();

  const name =
    statusUpdate.userId === currentUserId ? 'You' : statusUpdate.username;

  const verb = statusUpdate.userId === currentUserId ? 'are' : 'is';

  const textGenerator = (statusUpdateInput: StatusUpdateType) => {
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

  return (
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
      {handleFollowContextHolder}
    </div>
  );
}

export default StatusUpdateActivity;
