import { useMutation } from '@apollo/client';

import { EDIT_COMMENT_BY_ID } from '@/services/comments/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { EditCommentByIdPayload } from '@/graphql/__generated__/graphql';

const useEditComment = () => {
  const [editCommentRequest] = useMutation(EDIT_COMMENT_BY_ID);

  const editComment = async (
    commentId: string,
    body: string
  ): Promise<EditCommentByIdPayload> => {
    try {
      const response = await editCommentRequest({
        variables: { commentId, body },
        context: getTokenFromLocalStorage(),
      });
      if (
        !response ||
        !response.data ||
        !response.data.editCommentById ||
        response.data.editCommentById.errors[0]
      ) {
        throw new Error(response.data.editCommentById.errors[0]);
      }
      return response.data.editCommentById;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error editing comment');
    }
  };
  return { editComment };
};

export default useEditComment;
