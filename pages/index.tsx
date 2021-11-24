import { NextSeo } from 'next-seo';
import HeroComponent from '../components/index/HeroComponent';
import StatsComponent from '../components/index/StatsComponent';

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
