import { useLazyQuery } from '@apollo/client';
import type { QueryResult, OperationVariables } from '@apollo/client';
import { USER } from '@/services/user/queries';
import { getTokenFromLocalStorage } from '@/constants';
import type { UserQuery } from '@/graphql/__generated__/graphql';

type UseGetUserType = {
  getUser: () => Promise<QueryResult<UserQuery, OperationVariables>>;
  data: UserQuery;
  loading: boolean;
};

const useGetUser = (): UseGetUserType => {
  const [getUser, { data, loading }] = useLazyQuery(USER, {
    context: getTokenFromLocalStorage(),

    onCompleted: (returnedData) => {
      console.log('data in useGetUser', returnedData);
    },
  });

  console.log('context', getTokenFromLocalStorage());

  // console.log('data in useGetUser', data, localStorage.getItem('token'));

  return { getUser, data, loading };
};

export default useGetUser;
