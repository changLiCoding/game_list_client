import { useLazyQuery } from '@apollo/client';
import { USER } from './queries';
import { getTokenFromLocalStorage } from '@/constants';

const useGetUser = () => {
  const [getUser, { data, loading }] = useLazyQuery(
    USER,
    getTokenFromLocalStorage
  );

  return { getUser, data, loading };
};

export default useGetUser;
