import { Modal, Input } from 'antd';

import useNotification from '@/hooks/useNotification';
import useAddRemoveComment from '@/services/comments/useAddRemoveComment';
import useEditComment from '@/services/comments/useEditComment';
import type { Comment as CommentType } from '@/graphql/__generated__/graphql';

const useAddRemoveCommentCustomHook = () => {
  const { success, warning, contextHolder } = useNotification();
  const { editComment } = useEditComment();
  const { removeComment } = useAddRemoveComment();
  const handleRemoveComment = async (commentInput: CommentType) => {
    Modal.confirm({
      title: `Are you sure you want to remove this comment?`,
      content: 'You will not see this comment anymore.',
      onOk: async () => {
        const response = await removeComment(
          commentInput.commentableId,
          commentInput.commentableType,
          commentInput.id as string
        );
        if (response?.comment && response?.errors?.length === 0) {
          success(`You have removed this comment successfully.`);
        } else {
          warning(`Can not remove this comment. ${response}!`);
        }
      },
    });
  };

  const handleEditComment = async (commentInput: CommentType) => {
    Modal.confirm({
      title: `Edit your comment`,
      content: (
        <div>
          <Input.TextArea
            className="comment-editor"
            autoSize
            defaultValue={commentInput.body}
          />
          {contextHolder}
        </div>
      ),
      onOk: async () => {
        const commentEditor = document.getElementsByClassName(
          'comment-editor'
        )[0] as HTMLTextAreaElement;
        const response = await editComment(
          commentInput.id,
          commentEditor.value
        );
        if (response?.comment && response?.errors?.length === 0) {
          success(`You have edited this comment successfully.`);
        } else {
          warning(`Can not edit this comment. ${response}!`);
        }
      },
    });
  };

  return { handleRemoveComment, handleEditComment, contextHolder };
};

export default useAddRemoveCommentCustomHook;
