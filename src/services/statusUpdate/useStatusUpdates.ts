import {
  OperationVariables,
  ApolloQueryResult,
  useLazyQuery,
  QueryResult,
} from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_STATUS_UPDATES_FOR_A_USER } from '@/services/statusUpdate/queries';
import {
  GetAllStatusUpdatesForAUserQuery,
  StatusUpdate as StatusUpdateType,
} from '@/graphql/__generated__/graphql';

type StatusUpdateReturnType = {
  statusUpdates: StatusUpdateType[];
  loading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<
    ApolloQueryResult<{ getAllStatusUpdatesForAUser: StatusUpdateType[] }>
  >;
  getAllStatusUpdatesForAUser: () => Promise<
    QueryResult<GetAllStatusUpdatesForAUserQuery, OperationVariables>
  >;
};

const useStatusUpdates = (): StatusUpdateReturnType => {
  const [getAllStatusUpdatesForAUser, { data, loading, refetch, fetchMore }] =
    useLazyQuery(GET_ALL_STATUS_UPDATES_FOR_A_USER, {
      context: getTokenFromLocalStorage(),
    });

  try {
    if (!data || !data.getAllStatusUpdatesForAUser) {
      throw new Error('Error getting status updates');
    }
    const statusUpdates = data.getAllStatusUpdatesForAUser;
    return {
      getAllStatusUpdatesForAUser,
      statusUpdates,
      loading,
      refetch,
      fetchMore,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusUpdates = data
        ? (data.getAllStatusUpdatesForAUser as StatusUpdateType[])
        : [];

      return {
        getAllStatusUpdatesForAUser,
        statusUpdates,
        loading,
        refetch,
        fetchMore,
      };
    }
    data.getAllStatusUpdatesForAUser.errors = ['Unknown error'];
    return {
      getAllStatusUpdatesForAUser,
      statusUpdates: data.getAllStatusUpdatesForAUser
        ? (data.getAllStatusUpdatesForAUser as StatusUpdateType[])
        : [],
      loading,
      refetch,
      fetchMore,
    };
  }
};

export default useStatusUpdates;
