import type React from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

interface SignInProps {
  onSubmit: () => void;
}

function SignInForm({ onSubmit }: SignInProps): React.JSX.Element {
  return (
    <form className='font-cute text-neutral-300'>
      <div className='mb-10 mt-8 text-center'>
        <p className='mb-4 leading-tight'>
          Welcome back! Please login to access your DateVault account.
        </p>
      </div>

      {/* Username */}
      <FloatingLabel
        controlId='floatingInput'
        label='Username'
        className='mb-3 text-sm italic text-gray-600 '
      >
        <Form.Control type='username' placeholder='name123' />
      </FloatingLabel>

      <Form.Floating className='mb-3'>
        <Form.Control
          id='floatingPasswordCustom'
          type='password'
          placeholder='Password'
        />
        <label
          htmlFor='floatingPasswordCustom'
          className='text-sm italic text-gray-600'
        >
          Password
        </label>
      </Form.Floating>

      {/* Submit button */}
      <div className='mb-12 py-1 text-center'>
        <div className='mb-3 inline-block w-full'>
          <button
            className='custom-pink-gradient mb-3 inline-block w-full select-none rounded pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-gray-750 outline-none
           transition-all duration-500 ease-in-out hover:scale-110 hover:rounded-xl hover:brightness-110'
            type='button'
            onClick={onSubmit} // Call the onSubmit function on button click
          >
            Sign in
          </button>

          {/* Forgot password link */}
          <a href='#!'>Forgot password?</a>
        </div>
      </div>

      {/* Register button */}
      <div className='flex items-center justify-between pb-6'>
        <p className='mb-0 me-10'>Don&apos;t have an account?</p>
        <button type='button'>Register</button>
      </div>
    </form>
  );
}

export default SignInForm;
