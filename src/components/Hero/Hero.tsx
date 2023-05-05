import { Layout } from 'antd';

import FiltersWrapper from '@/components/FiltersWrapper';
import AllGames from '@/components/AllGames';

function Hero() {
  return (
    <Layout>
      <FiltersWrapper />
      <AllGames />
    </Layout>
  );
}

export default Hero;
