import { Button, Form, Input } from "antd";
import LoginImage from "../../assets/images/games_login.webp";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginType } from "../../types/authentication";
import useAuth from "../../services/authentication/useAuth";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/userSlice";
import { setLoading } from "../../features/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, contextHolder, info } = useAuth();

  const onFinish = async (values: LoginType) => {
    dispatch(setLoading(true));
    const loginData = await login(values.email, values.password);
    if (loginData.token) {
      localStorage.setItem("token", loginData.token);
      dispatch(setUser(loginData.user));
      navigate("/dashboard");
    } else {
      info(loginData.errors[0]);
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src={LoginImage} alt="Login" />
          </div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome back</p>
            <p>Login to the Dashboard</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter valid email!" },
              ]}
            >
              <Input placeholder="Email" data-testid="email-test" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                placeholder="Password"
                data-testid="password-test"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                LOGIN
              </Button>
            </Form.Item>
            <Link to={"/register"}>Need an account?</Link>
          </Form>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default Login;
