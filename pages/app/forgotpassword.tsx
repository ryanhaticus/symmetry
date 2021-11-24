import { NextSeo } from 'next-seo';
import LogoComponent from '../../components/misc/LogoComponent';
import Link from 'next/link';
import { useState } from 'react';
import FormErrorComponent from '../../components/misc/FormErrorComponent';
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
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>();
  const [error, setError] = useState<string[]>([]);
  const { sendPasswordReset } = useUserProvider();
  const { redirect } = useRedirectProvider();
  const forgotPassword = async () => {
    try {
      await sendPasswordReset(email);
      redirect('/app');
    } catch (e) {
      setError(['There was an issue resetting your password.']);
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
                Forgot your password?
              </h2>
            </div>

            <div className='mt-8'>
              <div className='mt-6'>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    forgotPassword();
                  }}
                  action='#'
                  method='POST'
                  className='space-y-3'
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

                  <div>
                    <div className='text-sm'>
                      <Link href='/app/signin'>
                        <a className='font-medium text-indigo-600 hover:text-indigo-500'>
                          Back to signin
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type='submit'
                      className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Forgot password
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

export default ForgotPasswordPage;
