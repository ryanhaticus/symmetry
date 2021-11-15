/* This example requires Tailwind CSS v2.0+ */
import { Transition } from '@headlessui/react';
import { XCircleIcon } from '@heroicons/react/solid';

interface FormErrorComponentParamsType {
  error: string[];
}

const FormErrorComponent = ({ error }: FormErrorComponentParamsType) => {
  return (
    <Transition
      show={error !== null && error.length > 0}
      enter='transition ease-out duration-500'
      enterFrom='opacity-0 -translate-y-1'
      enterTo='opacity-100 translate-y-0'
      leave='transition ease-in duration-150'
      leaveFrom='opacity-100 translate-y-0'
      leaveTo='opacity-0 -translate-y-1'
    >
      <div className='rounded-md bg-red-50 p-4'>
        <div className='flex'>
          <div className='flex-shrink-0'>
            <XCircleIcon className='h-5 w-5 text-red-400' aria-hidden='true' />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-red-800'>
              There was an error with your submission.
            </h3>
            <div className='mt-2 text-sm text-red-700'>
              <ul role='list' className='list-disc pl-5 space-y-1'>
                {error.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

export default FormErrorComponent;
