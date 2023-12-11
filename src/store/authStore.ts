import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import {
  loginUser,
  registerUser,
  verifyTokenRequest,
} from '../api/userRequest';
import { type UserData, UserDataResponse, UserLoginData } from '../types/types';

export type AuthState = {
  user: UserDataResponse | null;
  isAuthenticated: boolean;
  signUpErrors: string[];
  signInErrors: string[];
  loading: boolean;
  signUp: (user: UserData) => Promise<void>;
  signIn: (user: UserLoginData) => Promise<void>;
  clearSignUpErrors: (filter: (error: string) => boolean) => void;
  clearSignInErrors: (filter: (error: string) => boolean) => void;
  signOut: () => void;
  checkLogin: () => Promise<void>;
};

export const useAuthStore = createWithEqualityFn<AuthState>(
  (set) => ({
    user: null,
    isAuthenticated: false,
    signUpErrors: [],
    signInErrors: [],
    loading: true,

    signUp: async function (user: UserData): Promise<void> {
      try {
        const res = await registerUser(user);
        set({ user: res.output, isAuthenticated: true });
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          if (errorParsed.error.code === '11000') {
            set((state: AuthState) => ({
              signUpErrors: [
                ...state.signUpErrors,
                `Duplicate key in ${errorParsed.error.key}`,
              ],
            }));
          }
        }
      }
    },

    signIn: async function (userLogin: UserLoginData): Promise<void> {
      try {
        const res = await loginUser(userLogin);
        set({ user: res.output, isAuthenticated: true });
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorParsed = error.response?.data;
          set((state: AuthState) => ({
            signInErrors: [...state.signInErrors, errorParsed.error],
          }));
        }
      }
    },

    clearSignUpErrors: (filter: (error: string) => boolean) => {
      set((state: AuthState) => ({
        signUpErrors: state.signUpErrors.filter(filter),
      }));
    },

    clearSignInErrors: (filter: (error: string) => boolean) => {
      set((state: AuthState) => ({
        signInErrors: state.signInErrors.filter(filter),
      }));
    },

    signOut: () => {
      Cookies.remove('token');
      set({ user: null, isAuthenticated: false });
    },

    checkLogin: async () => {
      const cookies = Cookies.get();
      console.log('COOKIES: ', cookies);
      if (cookies['token'] == null) {
        set({ isAuthenticated: false, loading: false });
        console.log('AAAAA');
        return;
      }

      try {
        console.log('Inside');
        const res = await verifyTokenRequest();
        console.log(res, ' BBBB');
        if (res == null) {
          set({ isAuthenticated: false });
          console.log('CCCCC');
          return;
        }
        set({
          isAuthenticated: true,
          user: res.output,
          loading: false,
        });
      } catch (error) {
        set({ isAuthenticated: false, loading: false });
        console.log('Error. ', error);
      }
    },
  }),
  shallow,
);
