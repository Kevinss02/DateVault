import * as React from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { BsFillArrowThroughHeartFill } from 'react-icons/bs';

import { AuthState, useAuthStore } from '../store/authStore';
import { UserLoginData } from '../types/types';
import CuteButton from './CuteButton';

type SignInFormProps = {
  className?: string;
};

function SignInForm({ className }: SignInFormProps): React.JSX.Element {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const { signIn, signInErrors, clearSignInErrors } = useAuthStore(
    (state: AuthState) => ({
      signIn: state.signIn,
      signInErrors: state.signInErrors,
      clearSignInErrors: state.clearSignInErrors,
      isAuthenticated: state.isAuthenticated,
    }),
  );

  const onSubmit: SubmitHandler<FieldValues> = async function (
    values: FieldValues,
  ) {
    await signIn(values as UserLoginData);
  };

  const emailValue = watch('email');
  const passwordValue = watch('password');

  React.useEffect(() => {
    clearSignInErrors((error) => !error.includes('not found'));
  }, [emailValue, clearSignInErrors]);

  React.useEffect(() => {
    clearSignInErrors((error) => !error.includes('password'));
  }, [passwordValue, clearSignInErrors]);

  return (
    <form
      className={`font-cute mx-auto w-full max-w-[90%] text-neutral-300  lg:max-w-sm ${
        className ?? ''
      }`}
    >
      {/* Email */}
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

      {signInErrors.some((error) => error.includes('not found')) && (
        <div className='ms-2 mt-2 flex gap-2 text-left text-xs italic text-red-500'>
          <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
          User not found
        </div>
      )}

      {/* Password */}
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

      {signInErrors.some((error) => error.includes('password')) && (
        <div className='ms-2 mt-2 flex gap-2 text-left text-xs italic text-red-500'>
          <BsFillArrowThroughHeartFill className='mt-0_1 text-red-600' />
          Invalid password
        </div>
      )}

      {/* Submit button */}
      <div className='mt-4 '>
        <CuteButton
          className='text-xs'
          type='submit'
          onClick={handleSubmit(onSubmit)}
        >
          Sign in
        </CuteButton>
      </div>
    </form>
  );
}

export default SignInForm;
