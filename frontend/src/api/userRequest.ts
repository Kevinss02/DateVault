import {
  type ResponseType,
  UserData,
  type UserDataResponse,
  UserLoginData,
} from '../types/types';
import api from './axiosApi';

export const registerUser = async function (
  userValues: UserData,
): Promise<ResponseType<UserDataResponse>> {
  const response = await api.post<ResponseType<UserDataResponse>>(
    '/register',
    userValues,
  );
  return response.data;
};

export const loginUser = async function (
  userValues: UserLoginData,
): Promise<ResponseType<UserDataResponse>> {
  const response = await api.post<ResponseType<UserDataResponse>>(
    '/login',
    userValues,
  );
  return response.data;
};

export const verifyTokenRequest = async function (): Promise<
  ResponseType<UserDataResponse>
> {
  const response = await api.get('/verify', {
    withCredentials: true,
  });
  return response.data;
};
