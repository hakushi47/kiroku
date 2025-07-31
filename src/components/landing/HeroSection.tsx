'use client';

import React from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
}

export default function HeroSection({ onGetStarted, onLearnMore }: HeroSectionProps) {
  return (
    <section className="bg-gray-50 py-20 relative overflow-hidden">
      {/* ソフトピンクのグラデーション背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-transparent to-transparent opacity-60"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center relative">
          <div className="absolute top-0 right-0">
            <span className="inline-block bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              安全・安心の記録管理
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            あなたのサービスを
            <span className="text-pink-400">次のレベルへ</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Kiroku (キロク)は、ホスピタリティ業界で働く女性のための、安全で使いやすい記録管理アプリです。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onGetStarted}
              className="bg-pink-400 text-white px-8 py-4 rounded-lg font-medium hover:bg-pink-500 transition-colors text-lg"
            >
              無料で始める →
            </button>
            <button 
              onClick={onLearnMore}
              className="bg-white text-gray-700 px-8 py-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-lg border border-gray-300"
            >
              機能を詳しく見る
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 