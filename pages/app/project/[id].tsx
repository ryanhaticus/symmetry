import { NextSeo } from 'next-seo';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import RootAppComponent from '../../../component/app/RootAppComponent';
import LoadingComponent from '../../../component/misc/LoadingComponent';
import { useProjectHandler } from '../../../handler/ProjectHandler';

const AppIndexPage = () => {
  const { setActiveProject, activeProject } = useProjectHandler();
  const router = useRouter();
  useEffect(() => {
    const { id } = router.query;
    setActiveProject(id as string);
  }, []);
  return (
    <>
      <NextSeo title='Dashboard' />
      <RootAppComponent
        title={
          (activeProject ? activeProject.name : null) || 'Loading Project...'
        }
      >
        {activeProject == null && <LoadingComponent fullscreen={false} />}
        {activeProject != null && <>{activeProject.owner}</>}
      </RootAppComponent>
    </>
  );
};

export default AppIndexPage;
