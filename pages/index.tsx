import { NextSeo } from 'next-seo';
import HeroComponent from '../component/index/HeroComponent';
import StatsComponent from '../component/index/StatsComponent';

const IndexPage = () => {
  return (
    <>
      <NextSeo title='Welcome' />
      <HeroComponent />
      <StatsComponent />
    </>
  );
};

export default IndexPage;
