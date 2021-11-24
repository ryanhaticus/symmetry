import { useState } from 'react';
import { useCommentHandler } from '../../../handler/CommentHandler';
import { useProjectHandler } from '../../../handler/ProjectHandler';
import { useSourceHandler } from '../../../handler/SourceHandler';

const SourceTabComponent = () => {
  const { activeProject } = useProjectHandler();
  const { removeSource } = useSourceHandler();
  const { addComment, removeComment } = useCommentHandler();
  return (
    <>
      <div className='flex flex-col gap-y-4'>
        {activeProject.sources.map((source) => (
          <div
            key={source.href}
            className='border bg-white overflow-hidden shadow rounded-lg'
          >
            <div className='px-4 pb-8'>
              <div className='bg-white px-4 py-5 border-b border-gray-200 sm:px-6'>
                <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap lg:flex-nowrap'>
                  <div className='ml-4 mt-4'>
                    <h3 className='break-all text-lg leading-6 font-medium text-gray-900'>
                      {source.label}
                    </h3>
                    <p className='break-all mt-1 text-sm text-gray-500'>
                      {source.description}
                    </p>
                  </div>
                  <div className='flex gap-x-2 ml-4 mt-4 flex-shrink-0'>
                    <button
                      type='button'
                      onClick={() => removeSource(source.href)}
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
                    <a href={source.href} target='_blank'>
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
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
                          ></path>
                        </svg>
                        <span className='pl-2'>View source</span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
              <div className='px-4 sm:px-6 mt-4'>
                <div className='flex flex-col gap-y-2 mb-4'>
                  {source.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className='border bg-white overflow-hidden shadow rounded-lg'
                    >
                      <div className='py-4'>
                        <div className='bg-white px-4 sm:px-6'>
                          <div className='-ml-4 -mt-4 flex justify-between items-center flex-wrap lg:flex-nowrap'>
                            <div className='ml-4 mt-4'>
                              <h4 className='break-all text-md leading-6 font-medium text-gray-900'>
                                {comment.title}
                              </h4>
                              <p className='break-all mt-1 text-sm text-gray-500'>
                                {comment.description}
                              </p>
                            </div>
                            <div className='ml-4 mt-4 flex-shrink-0'>
                              <button
                                type='button'
                                onClick={() => removeComment(comment.id)}
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
                                <span className='pl-2'>Delete comment</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const target = e.currentTarget;
                    // Why not use useState()? Because then this introduces a bug where that state overlaps with other inputs.
                    const commentDescription =
                      target.getElementsByTagName('textarea')[0];
                    const commentTitle =
                      target.getElementsByTagName('input')[0];
                    await addComment(
                      source.href,
                      commentTitle.value,
                      commentDescription.value
                    );
                    commentTitle.value = '';
                    commentDescription.value = '';
                  }}
                  action='#'
                  className='relative'
                >
                  <div className='px-3 border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500'>
                    <label htmlFor='title' className='sr-only'>
                      Title
                    </label>
                    <input
                      type='text'
                      name='title'
                      id='title'
                      minLength={6}
                      className='block w-full border-0 pt-2.5 text-lg font-medium placeholder-gray-500 focus:ring-0'
                      placeholder='Title'
                    />
                    <label htmlFor='description' className='sr-only'>
                      Description
                    </label>
                    <textarea
                      rows={2}
                      name='description'
                      id='description'
                      minLength={6}
                      className='block w-full border-0 py-0 resize-none placeholder-gray-500 focus:ring-0 sm:text-sm'
                      placeholder='Write a description...'
                      defaultValue={''}
                    />

                    <div aria-hidden='true'>
                      <div className='py-2'>
                        <div className='h-9' />
                      </div>
                      <div className='h-px' />
                      <div className='py-2'>
                        <div className='py-px'>
                          <div className='h-9' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='absolute bottom-0 inset-x-px'>
                    <div className='border-t border-gray-200 px-2 py-2 flex justify-end items-center space-x-3 sm:px-3'>
                      <button
                        type='submit'
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Add comment
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SourceTabComponent;
