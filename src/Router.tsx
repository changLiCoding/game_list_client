import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import useTokenAuth from "./hooks/useTokenAuth";

const Router = () => {
  const { loading, userState } = useTokenAuth();

  if (loading || userState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {userState?.user?.username ? (
        <Route path="/dashboard" element={<Dashboard />} />
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/home" element={<Home />} />
      <Route
        path="*"
        element={
          userState?.user?.username ? (
            <Navigate to={"/dashboard"} />
          ) : (
            <Navigate to={"/home"} />
          )
        }
      />
    </Routes>
  );
};

export default Router;
