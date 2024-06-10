export const handleHttp = function (type, output, error) {
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
export const parseMongoErr = function (msg) {
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
