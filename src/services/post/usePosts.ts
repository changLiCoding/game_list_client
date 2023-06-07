import { useMutation } from '@apollo/client';

import { CREATE_POST, GET_GLOBAL_POSTS } from '@/services/post/queries';
import { getTokenFromLocalStorage } from '@/constants';
import { CreatePostPayload } from '@/graphql/__generated__/graphql';
import type { Post as PostType } from '@/graphql/__generated__/graphql';

const usePosts = () => {
  const [createPostRequest] = useMutation(CREATE_POST);

  const createPost = async (text: string): Promise<CreatePostPayload> => {
    try {
      const response = await createPostRequest({
        variables: { text },
        context: getTokenFromLocalStorage.context,

        update: (cache, { data }) => {
          console.log(
            'data.createPost.post returned from createPost mutation: ',
            data.createPost.post
          );

          const { getGlobalPosts } = cache.readQuery({
            query: GET_GLOBAL_POSTS,
          });

          console.log('readQueryResponse log results', getGlobalPosts);

          const newGetGlobalPosts = [data.createPost.post, ...getGlobalPosts];
          console.log('newGetGlobalPosts', newGetGlobalPosts);

          cache.writeQuery({
            query: GET_GLOBAL_POSTS,
            data: { getGlobalPosts: newGetGlobalPosts },
          });
        },
      });

      console.log(text);

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
