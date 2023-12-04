export type OpTypes =
  | 'registerUser'
  | 'zodValidation'
  | 'get'
  | 'add'
  | 'update'
  | 'delete';

export type ResponseType<T> = {
  type: OpTypes;
  success: boolean;
  output: T;
};

export type ResponseErrorType<T, E> = ResponseType<T> & {
  error: E;
};

export type UserData = {
  username: string;
  email: string;
  name: string;
  password: string;
};

export type UserDataResponse = Omit<UserData, 'password'> & {
  id: string;
  registrationDate: Date;
};

export type UserLoginData = Omit<UserData, 'name' | 'username'>;
