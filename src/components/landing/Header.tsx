'use client';

import React from 'react';

interface HeaderProps {
  onGetStarted: () => void;
}

export default function Header({ onGetStarted }: HeaderProps) {
  return (
    <header className="bg-gray-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-pink-400 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Kiroku</span>
          </div>
          <button 
            onClick={onGetStarted} 
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            始める →
          </button>
        </div>
      </div>
    </header>
  );
} 