import React from 'react';
import Hero from '../components/Hero';
import Products from '../components/Products';
import HowItWorks from '../components/HowItWorks';
import Benefits from '../components/Benefits';
import Industries from '../components/Industries';
import Trust from '../components/Trust';
import SocialProof from '../components/SocialProof';

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <Products />
      <HowItWorks />
      <Benefits />
      <Industries />
      <Trust />
      <SocialProof />
    </main>
  );
};

export default Home;
