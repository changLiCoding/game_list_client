import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/hooks';
import { setLoading, setUser } from '@/features/userSlice';
import useGetUser from '@/services/user/useGetUser';
import type { UseTokenAuthType } from '@/hooks/types';

const useTokenAuth = (): UseTokenAuthType => {
  // const authToken = localStorage.getItem('token');
  const dispatch = useDispatch();

  const userState = useAppSelector((state) => state.user);
  const { getUser, loading, data } = useGetUser();

  useEffect(() => {
    const authToken = localStorage.getItem('token');
    if (authToken !== null && authToken.length > 0 && !isExpired(authToken)) {
      getUser();
    } else {
      localStorage.clear();
      dispatch(setLoading(false));
    }
  }, [dispatch, getUser]);

  // useEffect(() => {
  //   if (authToken && !isExpired(authToken)) {

  //     getUser();

  //   } else {
  //     localStorage.clear();
  //     dispatch(setLoading(false));
  //   }
  // }, [authToken, dispatch, getUser, data]);

  useEffect(() => {
    const authToken = localStorage.getItem('token');

    if (data && authToken) {
      dispatch(setUser(data?.getUserById));
    }
  }, [data, dispatch]);

  return { loading, userState };
};

export default useTokenAuth;
