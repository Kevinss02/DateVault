import * as React from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

import { AuthState, useAuthStore } from '../store/authStore';
import { type UserData } from '../types/types';
import CuteButton from './CuteButton';

function SignUpForm(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const { signUp, signUpErrors, clearSignUpErrors, isAuthenticated } =
    useAuthStore((state: AuthState) => ({
      signUp: state.signUp,
      signUpErrors: state.signUpErrors,
      clearSignUpErrors: state.clearSignUpErrors,
      isAuthenticated: state.isAuthenticated,
    }));

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async function (
    values: FieldValues,
  ) {
    await signUp(values as UserData);
  };

  const usernameValue = watch('username');
  const emailValue = watch('email');

  React.useEffect(() => {
    clearSignUpErrors((error) => !error.includes('username'));
  }, [usernameValue, clearSignUpErrors]);

  React.useEffect(() => {
    clearSignUpErrors((error) => !error.includes('email'));
  }, [emailValue, clearSignUpErrors]);

  React.useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        navigate('/vault');
      }, 1500);

      return () => {
        clearTimeout(timer);
      };
    }

    return undefined;
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='font-cute mb-10 mt-8 text-center tracking-wider text-neutral-300'>
        <p className='mb-4 leading-tight'>
          Ops! You are not logged with us yet. Please sign up to continue and
          save your precious memories!
        </p>

        <input
          type='text'
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
            minLength: {
              value: 2,
              message: 'Username must be at least 2 characters',
            },
            maxLength: {
              value: 20,
              message: 'Username must not exceed 20 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: 'Username can only contain letters, numbers, _ , -',
            },
          })}
          className='w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Username'
        />

        {errors['username'] != null && (
          <div className='ms-2 mt-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            {errors['username'].message as string}
          </div>
        )}

        {signUpErrors.some(
          (error) => error === 'Duplicate key in username',
        ) && (
          <div className='ms-2 mt-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            Username already in use
          </div>
        )}

        <input
          type='text'
          {...register('name', {
            required: { value: true, message: 'Full name is required' },
            pattern: {
              value: /^[\p{L}\p{M}'\s-]+$/u,
              message: 'Invalid full name',
            },
            minLength: {
              value: 2,
              message: 'Full name must be at least 2 characters',
            },
            maxLength: {
              value: 77,
              message: 'Full name must not exceed 77 characters',
            },
          })}
          className='mt-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Full name'
        />

        {errors['name'] != null && (
          <div className='mt-btw-1-2 ms-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            {errors['name'].message as string}
          </div>
        )}

        <input
          type='text'
          {...register('email', {
            required: { value: true, message: 'Email is required' },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email',
            },
          })}
          className='mt-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Email'
        />

        {errors['email'] != null && (
          <div className='mt-btw-1-2 ms-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            {errors['email'].message as string}
          </div>
        )}

        {signUpErrors.some((error) => error === 'Duplicate key in email') && (
          <div className='ms-2 mt-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            Email already registered
          </div>
        )}

        <input
          type='password'
          {...register('password', {
            required: { value: true, message: 'Password is required' },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 20,
              message: 'Password must not exceed 20 characters',
            },
          })}
          className='mt-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Password'
        />

        {errors['password'] != null && (
          <div className='mt-btw-1-2 ms-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            {errors['password'].message as string}
          </div>
        )}

        <input
          type='password'
          {...register('confirmPassword', {
            required: { value: true, message: 'Confirm password is required' },
            validate: (value) => {
              return value === watch('password')
                ? true
                : 'The passwords do not match';
            },
          })}
          className='mt-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Confirm password'
        />

        {errors['confirmPassword'] != null && (
          <div className='mt-btw-1-2 ms-2 flex gap-2 text-left text-xs italic text-red-500'>
            <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
            {errors['confirmPassword'].message as string}
          </div>
        )}

        {/* Submit button */}
        <div className='mb-12 py-1 text-center'>
          <div className='mt-3 inline-block w-full'>
            <CuteButton type='submit' onClick={handleSubmit(onSubmit)}>
              Sign up
            </CuteButton>

            {/* Forgot password link */}
            <a href='#!'>Forgot password?</a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
