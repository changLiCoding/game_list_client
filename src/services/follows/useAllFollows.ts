import {
  useLazyQuery,
  OperationVariables,
  ApolloQueryResult,
  QueryResult,
} from '@apollo/client';
import { ALL_FOLLOWS_AND_FOLLOWERS } from '@/services/follows/queries';
import { getTokenFromLocalStorage } from '@/constants';
import {
  User as UserType,
  AllFollowsAndFollowersQuery,
} from '@/graphql/__generated__/graphql';

type UseAllFollowsType = {
  follows: UserType[];
  followers: UserType[];
  loading: boolean;
  getAllFollows: () => Promise<
    QueryResult<AllFollowsAndFollowersQuery, OperationVariables>
  >;
  refetch: () => Promise<
    ApolloQueryResult<{
      getAllFollows: {
        id: string;
        followedUsers: UserType[];
        followers: UserType[];
      };
    }>
  >;
};

const useAllFollows = (): UseAllFollowsType => {
  const [getAllFollows, { data, loading, refetch }] = useLazyQuery(
    ALL_FOLLOWS_AND_FOLLOWERS,
    {
      context: getTokenFromLocalStorage.context,
    }
  );
  console.log(data);

  try {
    if (!data || !data.getAllFollows) {
      throw new Error('Error getting follows');
    }

    const follows = data.getAllFollows.followedUsers;
    const { followers } = data.getAllFollows;

    return {
      getAllFollows,
      follows,
      followers,
      loading,
      refetch,
    };
  } catch (error: unknown) {
    console.log(error);

    if (error instanceof Error) {
      const follows = data
        ? (data?.getAllFollows?.followedUsers as UserType[])
        : [];

      const followers =
        data?.getAllFollows?.followers.length > 0
          ? (data?.getAllFollows?.followers as UserType[])
          : [];

      return {
        getAllFollows,
        follows,
        followers,
        loading,
        refetch,
      };
    }

    data.getAllFollows.errors = ['Unknown error'];

    return {
      getAllFollows,
      follows: data.getAllFollows.followedUsers as UserType[],
      followers: data.getAllFollows.followers as UserType[],
      loading,
      refetch,
    };
  }
};

export default useAllFollows;
