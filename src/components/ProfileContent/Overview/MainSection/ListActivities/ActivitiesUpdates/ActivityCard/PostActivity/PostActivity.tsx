import { Button, Popover, Avatar, Modal } from 'antd';

import type { Post as PostType } from '@/graphql/__generated__/graphql';
import useNotification from '@/hooks/useNotification';
import useAddRemoveFollow from '@/services/follows/useAddRemoveFollow';
import styles from '@/components/ProfileContent/Overview/MainSection/ListActivities/ActivitiesUpdates/ActivitiesUpdates.module.scss';

function PostActivity({
  post,
  currentUserId,
}: {
  post: PostType;
  currentUserId: string;
}) {
  const { addFollow, removeFollow } = useAddRemoveFollow();
  const { success, contextHolder, warning } = useNotification();

  const handleAddFollow = async (stateInput: PostType) => {
    Modal.confirm({
      title: `Are you sure you want to follow ${stateInput.username}?`,
      content: 'You will see their posts in your feed.',
      onOk: async () => {
        const response = await addFollow(stateInput.userId as string);
        if (response?.follow && response?.errors?.length === 0) {
          success(`You have followed ${stateInput.username} successfully.`);
        } else {
          warning(`Can not follow ${stateInput.username}. ${response}!`);
        }
      },
    });
  };
  return (
    <div className={styles.postActivityContainer}>
      <span>{post.text}</span>
    </div>
  );
}

export default PostActivity;
