'use client';

import React from 'react';
import { Button } from '@/components/Button';

interface CTASectionProps {
  onGetStarted: () => void;
  onDownloadMaterials: () => void;
}

export default function CTASection({ onGetStarted, onDownloadMaterials }: CTASectionProps) {
  return (
    <section className="py-16 bg-primary-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          今すぐKirokuでサービス品質を向上させませんか?
        </h2>
        <p className="text-xl text-white mb-8">
          無料でアカウントを作成し、すぐに使い始めることができます
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onGetStarted}
            className="bg-white text-primary-500 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            無料で始める →
          </Button>
          <Button 
            onClick={onDownloadMaterials}
            variant="secondary"
            className="border-white text-white hover:bg-white hover:text-primary-500 px-8 py-4 text-lg"
          >
            詳細資料をダウンロード
          </Button>
        </div>
      </div>
    </section>
  );
} 