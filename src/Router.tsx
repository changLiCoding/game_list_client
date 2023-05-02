import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import useTokenAuth from './hooks/useTokenAuth';
import UserGameList from './pages/UserGameList/UserGameList';
import GameDetail from './pages/GameDetail/GameDetail';

function Router() {
  const { loading, userState } = useTokenAuth();

  if (loading || userState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {userState?.user?.username ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/game-list" element={<UserGameList />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/game-detail/:id/:name" element={<GameDetail />} />
      <Route
        path="*"
        element={
          userState?.user?.username ? (
            <Navigate to="/dashboard" />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
    </Routes>
  );
}

export default Router;
