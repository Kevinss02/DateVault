import type React from 'react';
import { Link } from 'react-router-dom';

import SignInForm from '../components/SignInForm';

function SignInPage(): React.JSX.Element {
  return (
    <section className='relative flex min-h-[100vh] w-full min-w-min items-center justify-center bg-zinc-600'>
      <div className='absolute top-0 mt-[6%] h-[92%] w-[85%] rounded-2xl bg-zinc-600 opacity-45 mix-blend-multiply blur-2xl xl:mt-[3%] xl:h-[93%] 2xl:mt-[7%] 2xl:h-[75%]'></div>
      {/* Container */}
      <div className='relative m-5 min-w-min rounded-3xl bg-neutral-900 p-3 shadow-xl sm:w-[80%] sm:p-20'>
        <div className='rounded-lg bg-neutral-800 text-neutral-800 shadow-lg dark:text-neutral-200'>
          <div className='lg:flex lg:flex-wrap '>
            <div className='px-4 lg:w-1/2'>
              {/* Logo */}
              <div className='text-center'>
                <div className='flex items-center justify-center'>
                  <img
                    className='my-3 mt-5 w-32 select-none rounded-full sm:w-40'
                    src='/logo-pink.jpeg'
                    alt='logo'
                  />
                </div>
                <div className='font-cute text-4xl italic leading-tight sm:text-5xl lg:text-6xl'>
                  <span className='text-custom-pink'>Date</span>
                  <span className='text-custom-pastel'>Vault</span>
                </div>
              </div>
              <div>
                <SignInForm className='mt-3' />
                <div className='font-cute text-neutral-300'>
                  <div className='mb-10 text-center sm:mb-12 '>
                    {/* Forgot password link */}
                    <a href='#!'>Forgot password?</a>
                  </div>
                  {/* Register button */}
                  <div className='mb-6 flex items-center justify-end sm:justify-center xl:mb-10'>
                    <p className='me-10 hidden sm:block'>
                      Don&apos;t have an account?
                    </p>
                    <Link to='/sign-up'>Sign up</Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Right column container with background and description */}
            <div className='custom-pink-gradient flex items-center justify-center rounded-b-lg lg:w-1/2 lg:rounded-r-lg lg:rounded-bl-none'>
              <div className='font-cute relative px-4 py-6 text-xl font-semibold text-gray-750'>
                <div className='absolute ms-28 h-7 w-36 rounded-sm bg-zinc-600 opacity-50 blur-xl'></div>
                <span className=''>Save your </span>
                <span className='relative ms-1 tracking-widest text-neutral-200 drop-shadow-lg'>
                  memories
                </span>
                <div>
                  <span>and make them everlasting.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignInPage;
