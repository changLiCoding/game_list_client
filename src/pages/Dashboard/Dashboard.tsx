import { Button } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/features/userSlice";
import { INITIAL_USER_STATE } from "@/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(INITIAL_USER_STATE.user));
    navigate("/home");
  };
  return (
    <>
      <div>Dashboard</div>
      <Button onClick={logout}>Logout</Button>
    </>
  );
};

export default Dashboard;
