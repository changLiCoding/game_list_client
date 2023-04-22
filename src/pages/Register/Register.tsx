import { Button, Form, Input } from "antd";
import WelcomeImage from "../../assets/images/register_welcome.webp";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { RegisterType } from "../../types/authentication";
import authentication from "../../services/authentication";

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values: RegisterType) => {
    const registerData = await authentication.register(
      values.username,
      values.email,
      values.password
    );
    if (registerData.token) {
      localStorage.setItem("token", registerData.token);
      navigate("/dashboard");
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };

  return (
    <div className="register-page">
      <div className="register-box">
        <Form
          name="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Register</p>
          <p>Please fill in the form below</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Username" data-testid="user-test" />
          </Form.Item>

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
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
            ]}
          >
            <Input.Password
              placeholder="Password"
              data-testid="password-test"
            />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Password Confirmation"
              data-testid="password-confirmation-test"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              REGISTER
            </Button>
          </Form.Item>
          <Link to={"/login"}>Already have an account!</Link>
        </Form>
        <div className="illustration-wrapper">
          <img src={WelcomeImage} alt="Register" />
        </div>
      </div>
    </div>
  );
};

export default Register;
