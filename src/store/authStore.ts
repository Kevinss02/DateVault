import { AxiosError } from 'axios';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

import { loginUser, registerUser } from '../api/userRequest';
import { type UserData, UserDataResponse, UserLoginData } from '../types/types';

export type AuthState = {
  user: UserDataResponse | undefined;
  isAuthenticated: boolean;
  signUpErrors: string[];
  signInErrors: string[];
  loading: boolean;
  signUp: (user: UserData) => Promise<void>;
  signIn: (user: UserLoginData) => Promise<void>;
  clearSignUpErrors: (filter: (error: string) => boolean) => void;
  clearSignInErrors: (filter: (error: string) => boolean) => void;
};

export const useAuthStore = createWithEqualityFn<AuthState>(
  (set) => ({
    user: undefined,
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
  }),
  shallow,
);
