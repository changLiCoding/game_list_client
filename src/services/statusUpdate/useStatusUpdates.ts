import { useQuery } from '@apollo/client';
import { getTokenFromLocalStorage } from '@/constants';
import { GET_ALL_STATUS_UPDATES_FOR_A_USER } from '@/services/statusUpdate/queries';
import { StatusUpdate as StatusUpdateType } from '@/graphql/__generated__/graphql';

const useStatusUpdates = () => {
  const { data, loading, refetch } = useQuery(
    GET_ALL_STATUS_UPDATES_FOR_A_USER,
    getTokenFromLocalStorage
  );

  console.log(data.getAllStatusUpdatesForAUser);

  const { getAllStatusUpdatesForAUser: statusUpdates } = data;

  return { statusUpdates, loading, refetch };
};

export default useStatusUpdates;
