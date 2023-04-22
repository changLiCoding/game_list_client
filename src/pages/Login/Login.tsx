import { Button, Form, Input } from "antd";
import LoginImage from "../../assets/images/games_login.webp";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginType } from "../../types/authentication";
import authentication from "../../services/authentication";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: LoginType) => {
    const loginData = await authentication.login(values.email, values.password);
    if (loginData.token) {
      localStorage.setItem("token", loginData.token);
      navigate("/dashboard");
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  return (
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
            <Input placeholder="email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
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
  );
};

export default Login;
