import { Modal } from 'antd';

import useNotification from '@/hooks/useNotification';
import useAddRemoveFollow from '@/services/follows/useAddRemoveFollow';
import type {
  Comment as CommentType,
  Post as PostType,
  StatusUpdate as StatusUpdateType,
  User as UserType,
} from '@/graphql/__generated__/graphql';

const useAddRemoveFollowCustomHook = () => {
  const { success, warning, contextHolder } = useNotification('follow');

  const { addFollow, removeFollow } = useAddRemoveFollow();

  const handleAddFollow = async (
    commentInput: CommentType | StatusUpdateType | PostType
  ) => {
    Modal.confirm({
      title: `Are you sure you want to follow ${commentInput.user.username}?`,
      content: 'You will see their posts in your feed.',
      onOk: async () => {
        const response = await addFollow(commentInput.user.id as string);
        if (response?.follow && response?.errors?.length === 0) {
          success(
            `You have followed ${commentInput.user.username} successfully.`
          );
        } else {
          warning(`Can not follow ${commentInput.user.username}. ${response}!`);
        }
      },
    });
  };

  const handleRemoveFollow = (followedUser: UserType) => {
    Modal.confirm({
      title: `Are you sure you want to unfollow ${followedUser.username}?`,
      content: 'You will no longer see their posts in your feed.',
      onOk: async () => {
        const response = await removeFollow(followedUser.id);

        if (response?.follow && response?.errors?.length === 0) {
          success(`You have unfollowed ${followedUser.username} successfully.`);
        } else {
          warning(
            `There is something wrong when processing unfollow ${followedUser.username}!`
          );
        }
      },
    });
  };

  return { handleAddFollow, contextHolder, handleRemoveFollow };
};

export default useAddRemoveFollowCustomHook;
