import {
  useLazyQuery,
  ApolloQueryResult,
  QueryResult,
  OperationVariables,
} from '@apollo/client';
import { GET_GLOBAL_POSTS } from './queries';
import { getTokenFromLocalStorage } from '@/constants';
import { Post as PostType } from '@/graphql/__generated__/graphql';

type UseGlobalPostsType = {
  posts: PostType[];
  loading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<ApolloQueryResult<{ getGlobalPosts: PostType[] }>>;
  getGlobalPosts: () => Promise<QueryResult<PostType[], OperationVariables>>;
  fetchMore?: () => Promise<ApolloQueryResult<{ getGlobalPosts: PostType[] }>>;
};

const useGlobalPosts = (): UseGlobalPostsType => {
  const [getGlobalPosts, { data, loading, refetch, fetchMore }] = useLazyQuery(
    GET_GLOBAL_POSTS,
    {
      context: getTokenFromLocalStorage(),
    }
  );

  try {
    if (!data || !data.getGlobalPosts) {
      throw new Error('Error getting posts');
    }
    const posts = data.getGlobalPosts;
    return {
      getGlobalPosts,
      posts,
      loading,
      refetch,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const posts = data ? (data.getGlobalPosts as PostType[]) : [];

      return {
        getGlobalPosts,
        posts,
        loading,
        refetch,
        fetchMore,
      };
    }
    data.getGlobalPosts.errors = ['Unknown error'];
    return {
      getGlobalPosts,
      posts: data.getGlobalPosts ? (data.getGlobalPosts as PostType[]) : [],
      loading,
      refetch,
      fetchMore,
    };
  }
};

export default useGlobalPosts;
