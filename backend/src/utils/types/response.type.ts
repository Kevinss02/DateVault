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
