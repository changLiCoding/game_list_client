import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import useTokenAuth from '@/hooks/useTokenAuth';
import GameDetail from '@/pages/GameDetail/GameDetail';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import UserProfile from '@/pages/UserProfile';
import Forum from './pages/Forum';

function Router() {
  const { loading, userState } = useTokenAuth();

  if (loading || userState.loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {userState?.user?.username ? (
        <Route path="/user-profile">
          <Route path="" element={<UserProfile routeName="overview" />} />
          <Route
            path="overview"
            element={<UserProfile routeName="overview" />}
          />
          <Route
            path="favorites"
            element={<UserProfile routeName="favorites" />}
          />
          <Route
            path="game-list"
            element={<UserProfile routeName="gameList" />}
          />
          <Route path="social" element={<UserProfile routeName="social" />} />

          <Route path="reviews" element={<UserProfile routeName="reviews" />} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/game-detail/:id/:name" element={<GameDetail />} />

      <Route path="/forum" element={<Forum />} />
      <Route
        path="*"
        element={
          userState?.user?.username ? (
            <Navigate to="/user-profile/overview" />
          ) : (
            <Navigate to="/home" />
          )
        }
      />
    </Routes>
  );
}

export default Router;
