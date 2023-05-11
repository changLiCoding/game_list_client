import { useEffect } from 'react';
import { isExpired } from 'react-jwt';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/app/hooks';
import { setLoading, setUser } from '@/features/userSlice';
import useGetUser from '@/services/user/useGetUser';

const useTokenAuth = () => {
  const authToken = localStorage.getItem('token');
  const dispatch = useDispatch();
  const { getUser, loading, data } = useGetUser();
  const userState = useAppSelector((state) => state.user);

  useEffect(() => {
    if (authToken && !isExpired(authToken)) {
      getUser();
    } else {
      localStorage.clear();
      dispatch(setLoading(false));
    }
  }, [authToken, dispatch, getUser]);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.getUserById));
    }
  }, [data, dispatch]);

  console.log('hello');
  return { loading, userState };
};

export default useTokenAuth;
