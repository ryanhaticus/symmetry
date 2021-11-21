import { NextSeo } from 'next-seo';
import NewProjectComponent from '../../component/app/NewProjectComponent';
import RootAppComponent from '../../component/app/RootAppComponent';
import { useProjectHandler } from '../../handler/ProjectHandler';
import Link from 'next/link';

const AppIndexPage = () => {
  const { projects } = useProjectHandler();
  return (
    <>
      <NextSeo title='Dashboard' />
      <RootAppComponent title='Dashboard'>
        {projects.length == 0 && (
          <div className='h-full flex-grow flex items-center justify-center'>
            <NewProjectComponent modalOnly={false} />
          </div>
        )}
        {projects.length > 0 && <NewProjectComponent modalOnly={true} />}
        {projects.length > 0 && (
          <div>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {projects.map((project) => (
                <div
                  key={project.id}
                  className='relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500'
                >
                  <div className='flex-1 min-w-0'>
                    <Link href={`/app/project/${project.id}`}>
                      <a className='flex justify-between items-center focus:outline-none'>
                        <span className='absolute inset-0' aria-hidden='true' />
                        <p className='text-lg font-medium text-gray-900'>
                          {project.name}
                        </p>
                        <button
                          type='button'
                          className='z-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                        >
                          View
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </RootAppComponent>
    </>
  );
};

export default AppIndexPage;
