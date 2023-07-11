import { useMutation } from '@apollo/client';

import {
  ADD_COMMENT_TO_COMMENTABLE,
  REMOVE_COMMENT_FROM_COMMENTABLE,
} from '@/services/comments/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type {
  AddCommentToCommentablePayload,
  RemoveCommentFromCommentablePayload,
} from '@/graphql/__generated__/graphql';

const useAddRemoveComment = () => {
  const [addCommentRequest] = useMutation(ADD_COMMENT_TO_COMMENTABLE);
  const [removeCommentRequest] = useMutation(REMOVE_COMMENT_FROM_COMMENTABLE);

  const addComment = async (
    commentableId: string,
    commentableType: string,
    body: string
  ): Promise<AddCommentToCommentablePayload> => {
    try {
      const response = await addCommentRequest({
        variables: { commentableId, commentableType, body },
        context: getTokenFromLocalStorage(),
      });

      if (
        !response ||
        !response.data ||
        !response.data.addCommentToCommentable ||
        response.data.addCommentToCommentable.errors[0]
      ) {
        throw new Error(response.data.addCommentToCommentable.errors[0]);
      }
      return response.data.addCommentToCommentable;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error adding comment');
    }
  };

  const removeComment = async (
    commentableId: string,
    commentableType: string,
    commentId: string
  ): Promise<RemoveCommentFromCommentablePayload> => {
    try {
      const response = await removeCommentRequest({
        variables: { commentableId, commentableType, commentId },
        context: getTokenFromLocalStorage(),
      });
      if (
        !response ||
        !response.data ||
        !response.data.removeCommentFromCommentable ||
        response.data.removeCommentFromCommentable.errors[0]
      ) {
        throw new Error(response.data.removeCommentFromCommentable.errors[0]);
      }
      return response.data.removeCommentFromCommentable;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error removing comment');
    }
  };

  return {
    removeComment,
    addComment,
  };
};

export default useAddRemoveComment;
