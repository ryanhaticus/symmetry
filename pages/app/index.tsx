import { NextSeo } from 'next-seo';
import NewProjectComponent from '../../component/app/NewProjectComponent';
import RootAppComponent from '../../component/app/RootAppComponent';

const AppIndexPage = () => {
  return (
    <>
      <NextSeo title='Dashboard' />
      <RootAppComponent title='Dashboard'>
        <div className='h-full flex justify-center'>
          <NewProjectComponent />
        </div>
      </RootAppComponent>
    </>
  );
};

export default AppIndexPage;
