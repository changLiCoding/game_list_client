import { useAppSelector } from "@/app/hooks";
import { setLoading, setUser } from "@/features/userSlice";
import useGetUser from "@/services/user/useGetUser";
import React, { useEffect } from "react";
import { isExpired } from "react-jwt";
import { useDispatch } from "react-redux";

const useTokenAuth = () => {
  const authToken = localStorage.getItem("token");
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
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setUser(data?.getUserById));
    }
  }, [data]);
  return { loading, userState };
};

export default useTokenAuth;
