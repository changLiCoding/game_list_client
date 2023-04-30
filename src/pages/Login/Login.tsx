import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import { setUser } from '@/features/userSlice';
import useAuth from '@/services/authentication/useAuth';
import LoginImage from '@/assets/images/games_login.webp';
import type { LoginType } from './types';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login, contextHolder, info } = useAuth();

  const onFinish = async (values: LoginType) => {
    const loginData = await login(values.email, values.password);

    if (loginData.token) {
      localStorage.setItem('token', loginData.token);
      dispatch(setUser(loginData.user));
      navigate('/dashboard');
    } else {
      info(loginData.errors[0]);
    }
  };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log("Failed:", errorInfo);
  // };
  return (
    <>
      <div className={styles.loginPage}>
        <div className={styles.loginBox}>
          <div className={styles.illustrationWrapper}>
            <img src={LoginImage} alt="Login" />
          </div>
          <Form
            name={styles.loginForm}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
          >
            <p className={styles.formTitle}>Welcome back</p>
            <p>Login to the Dashboard</p>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter valid email!' },
              ]}
            >
              <Input placeholder="Email" data-testid="email-test" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
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
                className={styles.loginFormButton}
              >
                LOGIN
              </Button>
            </Form.Item>
            <Link to="/register">Need an account?</Link>
          </Form>
        </div>
      </div>
      {contextHolder}
    </>
  );
}

export default Login;
