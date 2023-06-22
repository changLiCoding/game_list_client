import { Modal } from 'antd';

import useNotification from '@/hooks/useNotification';

import useAddRemoveFollow from '@/services/follows/useAddRemoveFollow';
import type {
  Comment as CommentType,
  Post as PostType,
  StatusUpdate as StatusUpdateType,
} from '@/graphql/__generated__/graphql';

const useAddRemoveFollowCustomHook = () => {
  const { success, warning, contextHolder } = useNotification();

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

  return { handleAddFollow, contextHolder };
};

export default useAddRemoveFollowCustomHook;
