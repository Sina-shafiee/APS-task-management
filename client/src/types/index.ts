export type UserRegisterType = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginType = {
  email: string;
  password: string;
};

export type CustomErrorType = {
  message?: string;
};

export type SuccessLoginResponseType = {
  message: string;
  access_token: string;
  user: {
    email: string;
    _id: string;
    role: string;
  };
};
