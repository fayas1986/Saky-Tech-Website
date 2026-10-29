import React from 'react';
import Hero from '../components/Hero';
import OfferingsPillars from '../components/OfferingsPillars';
import Products from '../components/Products';
import BusinessChallenges from '../components/BusinessChallenges';
import EnterpriseIntegration from '../components/EnterpriseIntegration';
import IndustrySolutions from '../components/IndustrySolutions';
import Trust from '../components/Trust';
import SocialProof from '../components/SocialProof';
import CallToAction from '../components/CallToAction';

const Home: React.FC = () => {
  return (
    <main>
      {/* 1. Hero with Clear Positioning and Dual CTAs */}
      <Hero />

      {/* 2. Three Business Offerings Pillars */}
      <OfferingsPillars />

      {/* 3. Featured 7 Approved SaaS Products */}
      <Products />

      {/* 4. Business Challenges & Operational Capabilities */}
      <BusinessChallenges />

      {/* 5. Microsoft Dynamics 365 & Enterprise ERP Practice */}
      <EnterpriseIntegration />

      {/* 6. Vertical Industry Solutions */}
      <IndustrySolutions />

      {/* 7. Verified Security Architecture & Delivery Standards */}
      <Trust />

      {/* 8. Global Presence & Operational Footprint */}
      <SocialProof />

      {/* 9. Final Enterprise Consultation CTA */}
      <CallToAction />
    </main>
  );
};

export default Home;
