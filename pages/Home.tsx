import React from 'react';
import Hero from '../components/Hero';
import OfferingsPillars from '../components/OfferingsPillars';
import Products from '../components/Products';
import BusinessChallenges from '../components/BusinessChallenges';
import EnterpriseIntegration from '../components/EnterpriseIntegration';
import IndustrySolutions from '../components/IndustrySolutions';
import Trust from '../components/Trust';
import SocialProof from '../components/SocialProof';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';

const Home: React.FC = () => {
  return (
    <main>
      {/* 1. Hero with Clear Positioning, Social Avatars & Stats Row */}
      <Hero />

      {/* 2. Interactive 3 Pillars Showcase & 4-Card Enterprise Grid */}
      <OfferingsPillars />

      {/* 3. Featured 7 Approved SaaS Products */}
      <Products />

      {/* 4. Vertical Industry Solutions with Center Mockup */}
      <IndustrySolutions />

      {/* 5. Business Challenges & Operational Problem Solving */}
      <BusinessChallenges />

      {/* 6. Microsoft Dynamics 365 & Enterprise ERP Practice */}
      <EnterpriseIntegration />

      {/* 7. Verified Security Architecture & Delivery Standards */}
      <Trust />

      {/* 8. Testimonials & Global Operational Presence */}
      <SocialProof />

      {/* 9. Technical & Implementation FAQ Accordion */}
      <FAQ />

      {/* 10. iLanding High-Impact Consultation Banner */}
      <CallToAction />
    </main>
  );
};

export default Home;
