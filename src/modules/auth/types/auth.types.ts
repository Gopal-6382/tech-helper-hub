export type RegisterUserDto = {
  name: string;
  email: string;
  phone?: string;
  password: string;
};

export type LoginUserDto = {
  email: string;
  password: string;
};

export type ResetPasswordDto = {
  token: string;
  password: string;
};


