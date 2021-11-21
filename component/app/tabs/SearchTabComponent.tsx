import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';
import { useProjectHandler } from '../../../handler/ProjectHandler';
import { useSearchProvider } from '../../../handler/SearchHandler';
import { classNames } from '../../../helpers/CSS';
import ContentBonesComponent from '../../misc/ContentBonesComponent';
import FormErrorComponent from '../../misc/FormErrorComponent';

const settings = [
  {
    name: 'Educational Institutions',
    description:
      'Only obtain sources from accredited universities and educational institutions.'
  },
  {
    name: 'Organizations',
    description: 'Only obtain sources from public organizations.'
  },
  {
    name: 'Anything',
    description: 'No bounds. Obtain anything and everything.'
  }
];

const SearchTabComponent = () => {
  const [radioSelection, setRadioSelection] = useState(null);
  const {
    searched,
    searching,
    setOriginPreference,
    searchError,
    search,
    setTopicSearchTerm,
    setSearched
  } = useSearchProvider();
  const { activeProject } = useProjectHandler();
  return (
    <>
      {searched.length == 0 && !searching && (
        <div className='flex flex-grow items-center justify-center'>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              search();
            }}
            action='#'
            method='POST'
          >
            <div className='border shadow sm:rounded-md sm:overflow-hidden'>
              <div className='bg-white py-6 px-4 space-y-6 sm:p-6'>
                <div>
                  <h3 className='text-lg leading-6 font-medium text-gray-900'>
                    Make a scholarly search
                  </h3>
                  <p className='mt-1 text-sm text-gray-500'>
                    Please enter the relevant information to find sources that
                    best meet your needs.
                  </p>
                </div>

                <FormErrorComponent error={searchError} />

                <div className='flex flex-col gap-y-4'>
                  <div>
                    <label
                      htmlFor='research-topic'
                      className='block text-sm font-medium text-gray-700'
                    >
                      Research topic
                    </label>
                    <input
                      type='text'
                      name='research-topic'
                      id='research-topic'
                      minLength={6}
                      required={true}
                      onChange={(e) => setTopicSearchTerm(e.target.value)}
                      placeholder='Gun control in the United States'
                      className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                    />
                  </div>
                  <div>
                    <RadioGroup
                      value={radioSelection}
                      onChange={(e) => {
                        setRadioSelection(e);
                        setOriginPreference(e.name);
                      }}
                    >
                      <RadioGroup.Label>
                        <label
                          htmlFor='origin-preference'
                          className='mb-1 block text-sm font-medium text-gray-700'
                        >
                          Origin preference
                        </label>
                      </RadioGroup.Label>
                      <div className='bg-white rounded-md -space-y-px'>
                        {settings.map((setting, settingIdx) => (
                          <RadioGroup.Option
                            key={setting.name}
                            value={setting}
                            className={({ checked }) =>
                              classNames(
                                settingIdx === 0
                                  ? 'rounded-tl-md rounded-tr-md'
                                  : '',
                                settingIdx === settings.length - 1
                                  ? 'rounded-bl-md rounded-br-md'
                                  : '',
                                checked
                                  ? 'bg-indigo-50 borde1r-indigo-200 z-10'
                                  : 'border-gray-200',
                                'relative border p-4 flex cursor-pointer focus:outline-none'
                              )
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <span
                                  className={classNames(
                                    checked
                                      ? 'bg-indigo-600 border-transparent'
                                      : 'bg-white border-gray-300',
                                    active
                                      ? 'ring-2 ring-offset-2 ring-indigo-500'
                                      : '',
                                    'h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center'
                                  )}
                                  aria-hidden='true'
                                >
                                  <span className='rounded-full bg-white w-1.5 h-1.5' />
                                </span>
                                <div className='ml-3 flex flex-col'>
                                  <RadioGroup.Label
                                    as='span'
                                    className={classNames(
                                      checked
                                        ? 'text-indigo-900'
                                        : 'text-gray-900',
                                      'block text-sm font-medium'
                                    )}
                                  >
                                    {setting.name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as='span'
                                    className={classNames(
                                      checked
                                        ? 'text-indigo-700'
                                        : 'text-gray-500',
                                      'block text-sm'
                                    )}
                                  >
                                    {setting.description}
                                  </RadioGroup.Description>
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
                <button
                  type='submit'
                  className='flex items-center bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
                      d='M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z'
                    ></path>
                  </svg>
                  <span className='pl-2'>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {searched.length == 0 && searching && (
        <div className='flex flex-col gap-y-4'>
          <ContentBonesComponent />
          <ContentBonesComponent />
          <ContentBonesComponent />
        </div>
      )}
      {searched.length > 0 && !searching && (
        <>
          <div className='mb-2 md:mb-4'>
            <button
              type='button'
              onClick={() => setSearched([])}
              className='inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            >
              Search again
            </button>
          </div>
          <div className='grid grid-cols-1 gap-y-2 md:gap-4 md:grid-cols-2'>
            {searched.map((search) => (
              <div
                key={search.href}
                className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
              >
                <div className='flex-1 min-w-0'>
                  <span className='focus:outline-none'>
                    <span className='absolute inset-0' aria-hidden='true' />
                    <p className='text-sm font-medium text-gray-900'>
                      {search.label}
                    </p>
                    <p className='text-sm text-gray-500 truncate'>
                      {search.description}
                    </p>
                  </span>
                  <div className='relative flex gap-x-2 mt-4'>
                    <a href={search.href} target='_blank'>
                      <button
                        type='button'
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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
                            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                          ></path>
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            stroke-width='2'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          ></path>
                        </svg>
                        <span className='pl-2'>View source</span>
                      </button>
                    </a>
                    {activeProject.sources.find(
                      (source) => source.href === search.href
                    ) && (
                      <button
                        type='button'
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
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
                            d='M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
                          ></path>
                        </svg>
                        <span className='pl-2'>Remove from project</span>
                      </button>
                    )}
                    {activeProject.sources.find(
                      (source) => source.href === search.href
                    ) == null && (
                      <button
                        type='button'
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
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
                            d='M5 13l4 4L19 7'
                          ></path>
                        </svg>
                        <span className='pl-2'>Add to project</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default SearchTabComponent;
