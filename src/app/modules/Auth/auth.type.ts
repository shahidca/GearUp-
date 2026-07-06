export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profileImage?: string;
};

export type TLoginUser = {
  email: string;
  password: string;
};