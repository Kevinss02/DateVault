import type React from 'react';

import './App.css';

function App(): React.JSX.Element {
  return (
    <>
      <section className='custom-dark-gradient flex h-full items-center justify-center'>
        <div className='container p-10'>
          <div className='m-6 flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200'>
            <div className='w-full'>
              <div className='block rounded-lg bg-white shadow-lg dark:bg-neutral-800'>
                <div className='m-0 lg:flex lg:flex-wrap'>
                  <div className='px-4 md:px-0 lg:w-6/12'>
                    <div className='md:mx-6 md:p-12'>
                      {/* Logo */}
                      <div className='text-center'>
                        <img
                          className='mx-auto mb-5 w-40 rounded-full'
                          src='./src/assets/logo-pink.jpeg'
                          alt='logo'
                        />
                        <div className='font-cute mb-4 text-4xl italic leading-tight text-pink-600 md:text-5xl lg:text-6xl'>
                          <span className='text-custom-pink'>Date</span>
                          <span className='font-cute text-custom-pastel'>
                            Vault
                          </span>
                        </div>
                      </div>
                      <form>
                        <div className='mt-8 text-center'>
                          <p className='font-cute mb-4 leading-tight text-neutral-700 dark:text-neutral-300'>
                            Welcome back! Please login to access your DateVault
                            account.
                          </p>
                        </div>
                        {/* Username input */}
                        <div className='relative mb-4'></div>

                        {/* Password input */}
                        <div className='relative mb-4'></div>

                        {/* Submit button */}
                        <div className='mb-12 py-1 text-center'>
                          <button
                            className='font-cute mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-semibold uppercase leading-normal text-gray-750 shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]'
                            type='button'
                            style={{
                              background:
                                'linear-gradient(to right, #FFDFD3, #FEC8D8, #f0a6ca, #9c89b8)',
                            }}
                          >
                            Log in
                          </button>

                          {/* Forgot password link */}
                          <a href='#!' className='font-cute'>
                            Forgot password?
                          </a>
                        </div>

                        {/* Register button */}
                        <div className='font-cute flex items-center justify-between pb-6'>
                          <p className='mb-0 mr-2'>Dont have an account?</p>
                          <button type='button' data-te-ripple-color='light'>
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* Right column container with background and description */}
                  <div
                    className='flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none'
                    style={{
                      background:
                        'linear-gradient(to right, #FFDFD3, #FEC8D8, #f0a6ca, #9c89b8)',
                    }}
                  >
                    <div className='px-4 py-6 text-gray-750 md:mx-6 md:p-12'>
                      <h4 className='font-cute mb-6 text-xl font-semibold'>
                        We are more than just a company
                      </h4>
                      <p className='font-cute text-sm'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
