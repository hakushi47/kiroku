'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Header from './landing/Header';
import HeroSection from './landing/HeroSection';
import TopFeatures from './landing/TopFeatures';
import MainFeatures from './landing/MainFeatures';
import WhyChoose from './landing/WhyChoose';
import Testimonials from './landing/Testimonials';
import GettingStarted from './landing/GettingStarted';
import CTASection from './landing/CTASection';
import Footer from './landing/Footer';

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLearnMore = () => {
    router.push('/features');
  };

  const handleDownloadMaterials = () => {
    // 詳細資料ダウンロード機能（将来的に実装）
    console.log('詳細資料ダウンロード');
  };

  return (
    <div className="min-h-screen">
      <Header onGetStarted={handleGetStarted} />
      <HeroSection onGetStarted={handleGetStarted} onLearnMore={handleLearnMore} />
      <TopFeatures />
      <MainFeatures />
      <WhyChoose />
      <Testimonials />
      <GettingStarted />
      <CTASection onGetStarted={handleGetStarted} onDownloadMaterials={handleDownloadMaterials} />
      <Footer />
    </div>
  );
} 