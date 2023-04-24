export type LoginType = {
  email: string;
  password: string;
};

export type RegisterType = LoginType & {
  username: string;
  password_confirmation?: string;
};
