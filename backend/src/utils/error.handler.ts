import type {
  OpTypes,
  ResponseErrorType,
  ResponseType,
} from './types/response.type.js';

export function handleHttp<T, E>(
  type: OpTypes,
  output: T,
  error?: E,
): ResponseType<T> | ResponseErrorType<T, E> {
  return error !== undefined
    ? {
        type,
        success: false,
        output, // TODO just for debuggin
        error,
      }
    : {
        type,
        success: true,
        output,
      };
}
