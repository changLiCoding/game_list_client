import { Button, Form, Input } from "antd";
import WelcomeImage from "../../assets/images/register_welcome.webp";
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="register-page">
      <div className="register-box">
        <Form
          name="register-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Register</p>
          <p>Please fill in the form below</p>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="password_confirmation"
            rules={[
              { required: true, message: "Please re-enter your password!" },
            ]}
          >
            <Input.Password placeholder="Password Confirmation" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="register-form-button"
            >
              Register
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
