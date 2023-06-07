import {
  OperationVariables,
  ApolloQueryResult,
  useLazyQuery,
  QueryResult,
} from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_GLOBAL_STATUS_UPDATES } from '@/services/statusUpdate/queries';
import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';

type GlobalStatusUpdateReturnType = {
  statusUpdates: StatusUpdateType[];
  loading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<
    ApolloQueryResult<{ getGlobalStatusUpdates: StatusUpdateType[] }>
  >;
  getGlobalStatusUpdates: () => Promise<
    QueryResult<StatusUpdateType[], OperationVariables>
  >;
};

const useGlobalStatusUpdates = (): GlobalStatusUpdateReturnType => {
  const [getGlobalStatusUpdates, { data, loading, refetch }] = useLazyQuery(
    GET_GLOBAL_STATUS_UPDATES,
    {
      context: getTokenFromLocalStorage.context,
    }
  );

  try {
    if (!data || !data.getGlobalStatusUpdates) {
      throw new Error('Error getting status updates');
    }
    const statusUpdates = data.getGlobalStatusUpdates;
    return {
      getGlobalStatusUpdates,
      statusUpdates,
      loading,
      refetch,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusUpdates = data
        ? (data.getGlobalStatusUpdates as StatusUpdateType[])
        : [];

      return {
        getGlobalStatusUpdates,
        statusUpdates,
        loading,
        refetch,
      };
    }
    data.getGlobalStatusUpdates.errors = ['Unknown error'];
    return {
      getGlobalStatusUpdates,
      statusUpdates: data.getGlobalStatusUpdates
        ? (data.getGlobalStatusUpdates as StatusUpdateType[])
        : [],
      loading,
      refetch,
    };
  }
};

export default useGlobalStatusUpdates;
