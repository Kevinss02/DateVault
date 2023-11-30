import type React from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';

import { registerRequest } from '../api/auth';

function SignUpForm(): React.JSX.Element {
  const { register, handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async function (values) {
    const res = await registerRequest(values);
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='font-cute mb-10 mt-8 text-center text-neutral-300'>
        <p className='mb-4 leading-tight'>
          Ops! You are not logged with us yet. Please sign up to continue and
          save your precious memories!
        </p>

        <input
          type='text'
          {...register('username', { required: true })}
          className='mb-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Username'
        />

        <input
          type='text'
          {...register('email', { required: true })}
          className='mb-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Email'
        />

        <input
          type='password'
          {...register('password', { required: true })}
          className='mb-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Password'
        />

        <input
          type='text'
          {...register('name', { required: true })}
          className='mb-3 w-full rounded-md p-2 text-sm italic text-gray-600'
          placeholder='Nombe completo'
        />

        {/* Submit button */}
        <div className='mb-12 py-1 text-center'>
          <div className='mb-3 inline-block w-full'>
            <button
              className='custom-pink-gradient mb-3 inline-block w-full select-none rounded pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-gray-750 outline-none
           transition-all duration-500 ease-in-out hover:scale-105 hover:rounded-xl hover:brightness-110'
              type='submit'
            >
              Sign Up
            </button>

            {/* Forgot password link */}
            <a href='#!'>Forgot password?</a>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SignUpForm;
