import type {
  OpTypes,
  ResponseErrorType,
  ResponseType,
} from './types/response.type.js';
import type { mongoCustomError } from './types/types.js';

export const handleHttp = function <T, E>(
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
};

export const parseMongoErr = function (msg: string): mongoCustomError | null {
  const matchResult = msg.match(
    /E(\d+) duplicate key error collection: (.+?) index: (.+?) dup key: (.+)/,
  );

  if (matchResult == null) {
    return null;
  }

  const [, code, , , keyInfo] = matchResult;

  const keyDup = keyInfo
    .replace('{', '')
    .replace('}', '')
    .replace(':', '')
    .replaceAll('"', '')
    .replace(/^\s+|\s+$/g, '')
    .split(' ');

  return {
    code,
    key: keyDup[0],
    value: keyDup[1],
  };
};
