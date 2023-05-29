import {
  useQuery,
  OperationVariables,
  ApolloQueryResult,
} from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_STATUS_UPDATES_FOR_A_USER } from '@/services/statusUpdate/queries';
import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';

type StatusUpdateReturnType = {
  statusUpdates: StatusUpdateType[];
  loading: boolean;
  refetch: (
    variables?: Partial<OperationVariables> | undefined
  ) => Promise<
    ApolloQueryResult<{ getAllStatusUpdatesForAUser: StatusUpdateType[] }>
  >;
};

const useStatusUpdates = (): StatusUpdateReturnType => {
  const { data, loading, refetch } = useQuery(
    GET_ALL_STATUS_UPDATES_FOR_A_USER,
    {
      context: getTokenFromLocalStorage.context,
    }
  );

  try {
    if (!data || !data.getAllStatusUpdatesForAUser) {
      throw new Error('Error getting status updates');
    }
    const statusUpdates = data.getAllStatusUpdatesForAUser;
    return {
      statusUpdates,
      loading,
      refetch,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusUpdates = data
        ? (data.getAllStatusUpdatesForAUser as StatusUpdateType[])
        : [];

      return {
        statusUpdates,
        loading,
        refetch,
      };
    }
    data.getAllStatusUpdatesForAUser.errors = ['Unknown error'];
    return {
      statusUpdates: data.getAllStatusUpdatesForAUser
        ? (data.getAllStatusUpdatesForAUser as StatusUpdateType[])
        : [],
      loading,
      refetch,
    };
  }
};

export default useStatusUpdates;
