import { useMutation } from '@apollo/client';

import { CREATE_POST } from '@/services/post/queries';
import { getTokenFromLocalStorage } from '@/constants';
import { CreatePostPayload } from '@/graphql/__generated__/graphql';
import type {
  Post as PostType,
  Social as SocialType,
} from '@/graphql/__generated__/graphql';
import { GET_GLOBAL_SOCIALS } from '@/services/social/queries';

const usePosts = () => {
  type QueryResult = {
    getGlobalSocials: SocialType[];
  };
  const [createPostRequest] = useMutation(CREATE_POST);

  const createPost = async (text: string): Promise<CreatePostPayload> => {
    try {
      const response = await createPostRequest({
        variables: { text },
        context: getTokenFromLocalStorage(),

        update: (cache, { data }) => {
          const newPost = data?.createPost.post as PostType;
          const existingSocials = cache.readQuery<QueryResult>({
            query: GET_GLOBAL_SOCIALS,
            variables: { limit: 5, offset: 0 },
          });
          if (existingSocials) {
            cache.writeQuery<QueryResult>({
              query: GET_GLOBAL_SOCIALS,
              variables: { limit: 5, offset: 0 },
              data: {
                getGlobalSocials: [
                  newPost,
                  ...existingSocials.getGlobalSocials,
                ],
              },
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
