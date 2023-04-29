// import React, { useEffect } from "react";
// import { useAppSelector } from "../../app/hooks";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store";
import { Layout } from 'antd';

import FiltersWrapper from '@/components/FiltersWrapper/FiltersWrapper';
import AllGames from '@/components/AllGames/AllGames';

const Hero: React.FC = () => (
  <Layout>
    <FiltersWrapper />
    <AllGames />
  </Layout>
);

export default Hero;
