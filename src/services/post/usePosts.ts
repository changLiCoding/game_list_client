import { useMutation } from '@apollo/client';

import { CREATE_POST, GET_GLOBAL_POSTS } from '@/services/post/queries';
import { getTokenFromLocalStorage } from '@/constants';
import { CreatePostPayload } from '@/graphql/__generated__/graphql';
import type { Post as PostType } from '@/graphql/__generated__/graphql';

const usePosts = () => {
  type QueryResult = {
    getGlobalPosts: PostType[];
  };
  const [createPostRequest] = useMutation(CREATE_POST);

  const createPost = async (text: string): Promise<CreatePostPayload> => {
    try {
      const response = await createPostRequest({
        variables: { text },
        context: getTokenFromLocalStorage.context,

        update: (cache, { data }) => {
          const queryResult: QueryResult | null = cache.readQuery({
            query: GET_GLOBAL_POSTS,
          });
          // Make sure the query exists and getGlobalPosts is not null
          if (queryResult && queryResult.getGlobalPosts) {
            const { getGlobalPosts } = queryResult;

            const newGetGlobalPosts = [data.createPost.post, ...getGlobalPosts];

            cache.writeQuery({
              query: GET_GLOBAL_POSTS,
              data: { getGlobalPosts: newGetGlobalPosts },
            });
          }
        },
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
        return { errors: [error.message], post: null };
      }
      throw new Error('Error creating post');
    }
  };

  return { createPost };
};

export default usePosts;
