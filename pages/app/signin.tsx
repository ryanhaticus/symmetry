import { NextSeo } from 'next-seo';
import LogoComponent from '../../component/misc/LogoComponent';
import Link from 'next/link';
import { useState } from 'react';
import FormErrorComponent from '../../component/misc/FormErrorComponent';
import { useUserProvider } from '../../providers/UserProvider';
import { useRedirectProvider } from '../../providers/RedirectProvider';

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
const SigninPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string[]>([]);
  const { signInUser, signInWithGoogle } = useUserProvider();
  const { redirect } = useRedirectProvider();
  const signin = async () => {
    try {
      await signInUser(email, password);
      redirect('/app');
    } catch (e) {
      setError(['The credentials you entered were incorrect.']);
    }
  };
  return (
    <>
      <NextSeo title='Sign in' />
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className='min-h-screen flex'>
        <div className='flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
          <div className='mx-auto w-full max-w-sm lg:w-96'>
            <div>
              <LogoComponent />
              <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                Sign in to your account
              </h2>
            </div>

            <div className='mt-8'>
              <div>
                <div>
                  <p className='text-sm font-medium text-gray-700'>
                    Sign in with
                  </p>

                  <div className='mt-1'>
                    <div>
                      <button
                        onClick={async () => {
                          try {
                            await signInWithGoogle();
                            redirect('/app');
                          } catch {
                            setError([
                              'Something went wrong. Try again later.'
                            ]);
                          }
                        }}
                        className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                      >
                        <span className='sr-only'>Sign in with Google</span>
                        <svg
                          className='w-5 h-5'
                          aria-hidden='true'
                          fill='currentColor'
                          viewBox='0 0 488 512'
                        >
                          <path
                            xmlns='http://www.w3.org/2000/svg'
                            fill='currentColor'
                            d='M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z'
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <div className='mt-6 relative'>
                  <div
                    className='absolute inset-0 flex items-center'
                    aria-hidden='true'
                  >
                    <div className='w-full border-t border-gray-300' />
                  </div>
                  <div className='relative flex justify-center text-sm'>
                    <span className='px-2 bg-white text-gray-500'>
                      or continue with
                    </span>
                  </div>
                </div>
              </div>

              <div className='mt-6'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    signin();
                  }}
                  action='#'
                  method='POST'
                  className='space-y-6'
                >
                  <FormErrorComponent error={error} />
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Email address
                    </label>
                    <div className='mt-1'>
                      <input
                        id='email'
                        name='email'
                        type='email'
                        autoComplete='email'
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='space-y-1'>
                    <label
                      htmlFor='password'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Password
                    </label>
                    <div className='mt-1'>
                      <input
                        id='password'
                        name='password'
                        type='password'
                        autoComplete='current-password'
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                        className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                      />
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center'>
                      <input
                        id='remember-me'
                        name='remember-me'
                        type='checkbox'
                        className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                      />
                      <label
                        htmlFor='remember-me'
                        className='ml-2 block text-sm text-gray-900'
                      >
                        Remember me
                      </label>
                    </div>

                    <div className='text-sm'>
                      <Link href='/app/forgotpassword'>
                        <a className='font-medium text-indigo-600 hover:text-indigo-500'>
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className='hidden lg:block relative w-0 flex-1'>
          <img
            className='absolute inset-0 h-full w-full object-left object-cover'
            src='https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
            alt='Students talking about research'
          />
        </div>
      </div>
    </>
  );
};

export default SigninPage;
