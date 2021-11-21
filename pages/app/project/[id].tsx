import { NextSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import RootAppComponent from '../../../component/app/RootAppComponent';
import SearchTabComponent from '../../../component/app/tabs/SearchTabComponent';
import LoadingComponent from '../../../component/misc/LoadingComponent';
import { useProjectHandler } from '../../../handler/ProjectHandler';
import { classNames } from '../../../helpers/CSS';
import { useRedirectProvider } from '../../../providers/RedirectProvider';

const tabs = ['Search', 'Sources'];

const AppIndexPage = () => {
  const { setActiveProject, activeProject } = useProjectHandler();
  const [tab, setTab] = useState(tabs[0]);
  const { projectId } = useRedirectProvider();
  useEffect(() => {
    setActiveProject(projectId as string);
  }, [projectId]);
  return (
    <>
      <NextSeo
        title={(activeProject && activeProject.name) || 'Loading Project'}
      />
      <RootAppComponent
        title={
          (activeProject ? activeProject.name : null) || 'Loading Project...'
        }
      >
        {activeProject == null && <LoadingComponent fullscreen={false} />}
        {activeProject != null && (
          <>
            <div>
              <div className='sm:hidden'>
                <label htmlFor='tabs' className='sr-only'>
                  Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                  id='tabs'
                  name='tabs'
                  className='block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md'
                  defaultValue={tab}
                  onChange={(e) => setTab(e.target.value)}
                >
                  {tabs.map((tab) => (
                    <option key={tab}>{tab}</option>
                  ))}
                </select>
              </div>
              <div className='hidden sm:block'>
                <div className='border-b border-gray-200'>
                  <nav className='-mb-px flex' aria-label='Tabs'>
                    {tabs.map((_tab) => (
                      <button
                        key={_tab}
                        className={classNames(
                          tab === _tab
                            ? 'border-indigo-500 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                          'flex-grow w-1/4 py-4 px-1 text-center border-b-2 font-medium text-md'
                        )}
                        onClick={() => setTab(_tab)}
                        aria-current={tab === _tab ? 'page' : undefined}
                      >
                        {_tab}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            <div className='mt-2 sm:mt-4 flex-grow'>
              {tab == 'Search' && <SearchTabComponent />}
              {tab == 'Sources' && <>Sources</>}
            </div>
          </>
        )}
      </RootAppComponent>
    </>
  );
};

export default AppIndexPage;
