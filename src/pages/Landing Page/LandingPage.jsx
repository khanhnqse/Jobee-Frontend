import React from 'react';
import { Row, Col, Button, Typography, Input, Checkbox, Card } from 'antd';

import Hero from '@/components/Hero Landing/Hero';
import Services from '@/components/Service Section/Service';
import Banner from '@/components/Banner/Banner';
import Subscribe from '@/components/Subscribe/Subscribe';
import Reviews from '@/components/Testmotional/Review';

const { Title, Text, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Banner />
      <Subscribe />
      <Reviews />
    </>
  );
};

export default LandingPage;
