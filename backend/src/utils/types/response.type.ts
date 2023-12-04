export type OpTypes =
  | 'registerUser'
  | 'loginUser'
  | 'profileUser'
  | 'zodValidation'
  | 'tokenValidation'
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
