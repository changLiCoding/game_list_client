import { describe, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import ContextWrapper from '@/ContextWrapper';
import Login from '@/pages/Login/Login';

// This is a mock of useAuth (useAuth will not be running)
vi.mock('../../services/authentication/useAuth', async () => {
  const actual: any = await vi.importActual(
    '../../services/authentication/useAuth',
  );
  return {
    ...actual,
    default: () => ({
      login: vi.fn().mockReturnValue({
        user: {
          username: 'Vv',
        },
        token: 'token',
        errors: [],
      }),
      info: vi.fn(),
    }),
  };
});

// If use this, useAuth will run and require to mock useMutation inside useAuth
// vi.mock("@apollo/client", async () => {
//   const actual: any = await vi.importActual("@apollo/client");
//   return {
//     ...actual,
//     useMutation: vi.fn(() => {
//       return [
//         vi.fn(() => ({
//           data: {
//             login: {
//               user: {
//                 username: "Vv",
//               },
//               token: "token",
//               errors: [],
//             },
//           },
//         })),
//         { loading: false, error: false },
//       ];
//     }),
//   };
// });

vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn().mockReturnValue((value: string) => value),
  };
});

describe('Login', () => {
  it('Renders login', () => {
    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>,
    );

    // Expect the following texts to be present
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText('Login to the Dashboard')).toBeInTheDocument();

    // Expect all input fields (including Email and Password) to be present
    const inputEmail = screen.getByPlaceholderText('Email');
    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByPlaceholderText('Password');
    expect(inputPassword).toBeInTheDocument();
  });

  it('Successfully login', async () => {
    const navigate = useNavigate();
    render(
      <ContextWrapper>
        <Login />
      </ContextWrapper>,
    );

    const button = screen.getByRole('button', { name: 'LOGIN' });
    const email = screen.getByTestId('email-test');
    await userEvent.type(email, import.meta.env.VITE_USER_EMAIL_TEST);
    const password = screen.getByTestId('password-test');
    await userEvent.type(password, import.meta.env.VITE_PASSWORD_TEST);
    await userEvent.click(button);

    const textEmail = screen.queryByText('Please input your email!');
    expect(textEmail).toBeNull();

    const textPassword = screen.queryByText('Please input your password!');
    expect(textPassword).toBeNull();

    expect(navigate('/dashboard')).toBe('/dashboard');
  });
});
