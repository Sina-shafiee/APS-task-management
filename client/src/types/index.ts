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

export type ToggleTaskType = {
  isCompleted: boolean;
  taskId: string;
};

export type EditUserFormDefaultsValues = {
  name: string;
  github: string;
  linkedin: string;
  skills: string[];
  language: string[];
  email: string;
};

export type CreateUserFormValues = {
  name: string;
  email: string;
  password: string;
};
