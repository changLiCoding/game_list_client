import { useMutation } from '@apollo/client';

import { CREATE_POST } from '@/services/post/queries';
import { getTokenFromLocalStorage } from '@/constants';
import {
  CreatePostPayload,
  CreatePostInput,
} from '@/graphql/__generated__/graphql';

const usePosts = () => {
  const [createPostRequest] = useMutation(CREATE_POST);

  const createPost = async (
    payload: CreatePostInput
  ): Promise<CreatePostPayload> => {
    try {
      const response = await createPostRequest({
        variables: { input: payload },
        context: getTokenFromLocalStorage.context,
      });
      if (
        !response ||
        !response.data ||
        !response.data.createPost ||
        response.data.createPost.errors[0]
      ) {
        throw new Error(response.data.createPost.errors[0]);
      }
      return response.data.createPost;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error creating post');
    }
  };

  return { createPost };
};

export default usePosts;
