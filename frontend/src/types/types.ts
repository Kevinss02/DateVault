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

export type MemoryData = {
  date: string;
  title: string;
  description: string;
  feelings: 'very bad' | 'bad' | 'regular' | 'good' | 'very good' | '';
  imagesUrl: string[];
  location: string;
};

export type MemoryDataResponse = MemoryData & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
