export type ValueOf<T> = T[keyof T];
export type IndexOf<T> = Exclude<keyof T, keyof []>;
