import { NextSeo } from 'next-seo';
import RootAppComponent from '../../../component/app/RootAppComponent';

const AppIndexPage = () => {
  return (
    <>
      <NextSeo title='Dashboard' />
      <RootAppComponent title='Project'>
        <div className='h-full flex justify-center'>This is a project</div>
      </RootAppComponent>
    </>
  );
};

export default AppIndexPage;
