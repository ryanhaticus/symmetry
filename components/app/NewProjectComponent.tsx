/* This example requires Tailwind CSS v2.0+ */
import { PlusIcon } from '@heroicons/react/solid';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useSharedStateProvider } from '../../providers/SharedStateProvider';
import FormErrorComponent from '../misc/FormErrorComponent';
import { useProjectHandler } from '../../handlers/ProjectHandler';

interface NewProjectComponentParamsType {
  modalOnly: boolean;
}

const NewProjectComponent = ({ modalOnly }: NewProjectComponentParamsType) => {
  const { newProjectModalOpen, setNewProjectModalOpen } =
    useSharedStateProvider();
  const [name, setName] = useState('');
  const [error, setError] = useState([]);
  const { newProject } = useProjectHandler();

  const _newProject = async () => {
    try {
      await newProject(name);
      setNewProjectModalOpen(false);
    } catch (e) {
      setError([
        'Please ensure your project name is at least 6 characters long.'
      ]);
    }
  };
  return (
    <>
      <Transition.Root show={newProjectModalOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          onClose={setNewProjectModalOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  _newProject();
                }}
                action='#'
                method='POST'
                className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'
              >
                <div>
                  <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100'>
                    <PlusIcon
                      className='h-6 w-6 text-indigo-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Please name your new project
                    </Dialog.Title>
                    <FormErrorComponent
                      className='rounded-md bg-red-50 p-4 my-4'
                      error={error}
                    />
                    <div className='mt-2'>
                      <div>
                        <input
                          type='text'
                          name='text'
                          id='text'
                          onChange={(e) => setName(e.target.value)}
                          required={true}
                          minLength={6}
                          className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md'
                          placeholder='Quarterly Research Project'
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-2 sm:mt-4'>
                  <button
                    type='submit'
                    className='inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm'
                  >
                    Create new project
                  </button>
                </div>
              </form>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {!modalOnly && (
        <div className='text-center'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            aria-hidden='true'
          >
            <path
              vectorEffect='non-scaling-stroke'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z'
            />
          </svg>
          <h3 className='mt-2 text-sm font-medium text-gray-900'>
            No projects
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            Get started by creating a new project.
          </p>
          <div className='mt-6'>
            <button
              type='button'
              onClick={() => setNewProjectModalOpen(true)}
              className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              <PlusIcon className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
              New Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProjectComponent;
