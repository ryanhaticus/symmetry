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
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import {
  ClockIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon
} from '@heroicons/react/outline';
import { SearchIcon, SelectorIcon } from '@heroicons/react/solid';
import LogoComponent from '../misc/LogoComponent';
import { useUserProvider } from '../../providers/UserProvider';
import { useSharedStateProvider } from '../../providers/SharedStateProvider';
import LoadingComponent from '../misc/LoadingComponent';
import { useRedirectProvider } from '../../providers/RedirectProvider';
import { classNames } from '../../helpers/CSS';
import { useProjectHandler } from '../../handler/ProjectHandler';

const navigation = [
  { name: 'My projects', href: '/app', icon: ViewListIcon, current: false },
  { name: 'Recent', href: '#', icon: ClockIcon, current: false }
];

interface RootAppComponentParamsType {
  title: string;
  children: any;
}

const RootAppComponent = ({ title, children }: RootAppComponentParamsType) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, signOut } = useUserProvider();
  const { setNewProjectModalOpen } = useSharedStateProvider();
  const { redirect, route } = useRedirectProvider();
  const { deleteProject, activeProject } = useProjectHandler();
  useEffect(() => {
    if (user !== null) {
      return;
    }
    redirect('/app/signin');
  }, []);
  if (user == null) {
    return <LoadingComponent fullscreen={true} />;
  }
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className='min-h-full'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='fixed inset-0 flex z-40 lg:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75' />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <div className='relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white'>
                <Transition.Child
                  as={Fragment}
                  enter='ease-in-out duration-300'
                  enterFrom='opacity-0'
                  enterTo='opacity-100'
                  leave='ease-in-out duration-300'
                  leaveFrom='opacity-100'
                  leaveTo='opacity-0'
                >
                  <div className='absolute top-0 right-0 -mr-12 pt-2'>
                    <button
                      type='button'
                      className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className='sr-only'>Close sidebar</span>
                      <XIcon
                        className='h-6 w-6 text-white'
                        aria-hidden='true'
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className='flex-shrink-0 flex items-center px-4'>
                  <LogoComponent />
                </div>
                <div className='mt-5 flex-1 h-0 overflow-y-auto'>
                  <nav className='px-2'>
                    <div className='space-y-1'>
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.current
                                ? 'bg-gray-100 text-gray-900'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                              'group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? 'text-gray-500'
                                  : 'text-gray-400 group-hover:text-gray-500',
                                'mr-3 flex-shrink-0 h-6 w-6'
                              )}
                              aria-hidden='true'
                            />
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className='flex-shrink-0 w-14' aria-hidden='true'>
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className='hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:border-r lg:border-gray-200 lg:pt-5 lg:pb-4 lg:bg-gray-100'>
          <div className='flex items-center flex-shrink-0 px-6'>
            <LogoComponent />
          </div>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='mt-6 h-0 flex-1 flex flex-col overflow-y-auto'>
            {/* User account dropdown */}
            <Menu
              as='div'
              className='mt-2 px-3 relative inline-block text-left'
            >
              <div>
                <Menu.Button className='group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
                  <span className='flex w-full justify-between items-center'>
                    <span className='flex min-w-0 items-center justify-between space-x-3'>
                      <img
                        className='w-10 h-10 bg-gray-300 rounded-full flex-shrink-0'
                        src={user.photoURL || '/img/defaultprofilephoto.png'}
                        alt='Profile photo'
                      />
                      <span className='flex-1 flex flex-col min-w-0'>
                        <span className='text-gray-900 text-sm font-medium truncate'>
                          {user.displayName || 'Symmetry User'}
                        </span>
                        <span className='text-gray-500 text-sm truncate'>
                          {user.email}
                        </span>
                      </span>
                    </span>
                    <SelectorIcon
                      className='flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </span>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                  <div className='py-1'>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={async () => signOut()}
                          className={classNames(
                            active
                              ? 'bg-gray-100 text-gray-900'
                              : 'text-gray-700',
                            'w-full block px-4 py-2 text-sm'
                          )}
                        >
                          Sign out
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            {/* Navigation */}
            <nav className='px-3 mt-6'>
              <div className='space-y-1'>
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.current
                          ? 'bg-gray-200 text-gray-900'
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50',
                        'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      <item.icon
                        className={classNames(
                          item.current
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden='true'
                      />
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
        {/* Main column */}
        <div className='lg:pl-64 flex flex-col min-h-screen'>
          {/* Search header */}
          <div className='sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden'>
            <button
              type='button'
              className='px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <MenuAlt1Icon className='h-6 w-6' aria-hidden='true' />
            </button>
            <div className='flex-1 flex justify-between px-4 sm:px-6 lg:px-8'>
              <div className='flex-1 flex'>
                <form className='w-full flex md:ml-0' action='#' method='GET'>
                  <label htmlFor='search-field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
                      <SearchIcon className='h-5 w-5' aria-hidden='true' />
                    </div>
                    <input
                      id='search-field'
                      name='search-field'
                      className='block w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:text-sm'
                      placeholder='Search'
                      type='search'
                    />
                  </div>
                </form>
              </div>
              <div className='flex items-center'>
                {/* Profile dropdown */}
                <Menu as='div' className='ml-3 relative'>
                  <div>
                    <Menu.Button className='max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src={user.photoURL || '/img/defaultprofilephoto.png'}
                        alt='Profile photo'
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none'>
                      <div className='py-1'>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={classNames(
                                active
                                  ? 'bg-gray-100 text-gray-900'
                                  : 'text-gray-700',
                                'w-full block px-4 py-2 text-sm'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <main>
            {/* Page title & actions */}
            <div className='border-b border-gray-200 px-4 py-4 flex items-center justify-between sm:px-6 lg:px-8'>
              <div className='flex-1 min-w-0'>
                <h1 className='text-lg font-medium leading-6 text-gray-900 sm:truncate'>
                  {title}
                </h1>
              </div>

              <div className='flex gap-x-2'>
                {route !== '/app' && (
                  <>
                    <button
                      type='button'
                      onClick={() => deleteProject(activeProject.id)}
                      className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:order-1'
                    >
                      <svg
                        className='w-6 h-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                        ></path>
                      </svg>
                      <span className='pl-2 text-md'>Delete</span>
                    </button>
                    <Link href='/app'>
                      <button
                        type='button'
                        className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1'
                      >
                        <svg
                          className='w-5 h-5'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M10 19l-7-7m0 0l7-7m-7 7h18'
                          ></path>
                        </svg>
                        <span className='pl-2 text-md'>Back</span>
                      </button>
                    </Link>
                  </>
                )}
                {!route.includes('/project/') && (
                  <button
                    type='button'
                    onClick={() => setNewProjectModalOpen(true)}
                    className='order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:order-1 sm:ml-3'
                  >
                    <svg
                      className='w-6 h-6'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      ></path>
                    </svg>
                    <span className='pl-2 text-md'>New project</span>
                  </button>
                )}
              </div>
            </div>
          </main>
          <div className='p-4 px-4 sm:px-8 flex flex-col flex-grow'>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default RootAppComponent;
