import type React from 'react';

import SignUpForm from '../components/SignUpForm';

function SignUpPage(): React.JSX.Element {
  return (
    <section className='flex min-h-screen items-center justify-center bg-custom-purple'>
      <div className='my-5 w-full max-w-4xl rounded-3xl bg-neutral-900'>
        <div className='p-5 md:p-10'>
          <div className='flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
            <div className='w-full'>
              <div className='block rounded-lg bg-neutral-800 shadow-lg'>
                <div className='flex flex-wrap lg:flex-nowrap'>
                  <div className='w-full lg:w-6/12'>
                    <div className='p-4 md:p-12'>
                      <SignUpForm />
                    </div>
                  </div>

                  {/* Right column container with background and description */}
                  <div className='custom-pink-gradient rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'>
                    {/* Logo */}
                    <div className='text-center'>
                      <div className='relative mt-10 flex items-center justify-center lg:mt-20'>
                        <div className='mb-5 h-24 w-24 rounded-full bg-neutral-800 shadow-lg lg:h-45 lg:w-45'></div>
                        <img
                          className='absolute mb-5 w-24 rounded-full lg:w-40'
                          src='/logo-pink.jpeg'
                          alt='logo'
                        />
                      </div>
                      <div className='font-cute mb-2 text-3xl italic leading-tight md:text-4xl lg:text-5xl'>
                        <span className=''>Date</span>
                        <span className=''>Vault</span>
                      </div>
                    </div>
                    <div className='font-cute px-4 py-6 text-base font-semibold text-gray-750 md:px-6 md:py-12 lg:text-xl'>
                      <span className=''>Save your </span>
                      <span className='italic tracking-widest text-white/[.75] drop-shadow-2xl'>
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUpPage;
