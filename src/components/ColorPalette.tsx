'use client';

import React from 'react';
import { colors, themeColors } from '@/lib/colors';

interface ColorSwatchProps {
  name: string;
  color: string;
  className?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ name, color, className = '' }) => (
  <div className={`flex items-center space-x-3 p-3 rounded-lg border ${className}`}>
    <div 
      className="w-12 h-12 rounded-lg border-2 border-gray-200 shadow-sm"
      style={{ backgroundColor: color }}
    />
    <div>
      <p className="font-medium text-sm">{name}</p>
      <p className="text-xs text-gray-500 font-mono">{color}</p>
    </div>
  </div>
);

interface ColorSectionProps {
  title: string;
  colors: Record<string, string>;
  className?: string;
}

const ColorSection: React.FC<ColorSectionProps> = ({ title, colors, className = '' }) => (
  <div className={`space-y-4 ${className}`}>
    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      {Object.entries(colors).map(([name, color]) => (
        <ColorSwatch key={name} name={name} color={color} />
      ))}
    </div>
  </div>
);

export default function ColorPalette() {
  return (
    <div className="min-h-screen bg-background-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">カラーパレット</h1>
          <p className="text-lg text-gray-600">
            Kirokuアプリケーションで使用するカラーコード設定
          </p>
        </div>

        <div className="space-y-12">
          {/* メインテーマカラー */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <ColorSection 
              title="メインテーマカラー (Primary)" 
              colors={colors.primary}
            />
          </div>

          {/* アクセントカラー */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <ColorSection 
              title="アクセントカラー (Accent)" 
              colors={colors.accent}
            />
          </div>

          {/* 背景色 */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <ColorSection 
              title="背景色 (Background)" 
              colors={colors.background}
            />
          </div>

          {/* グレー系 */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <ColorSection 
              title="グレー系 (Gray)" 
              colors={colors.gray}
            />
          </div>

          {/* ダークテーマ */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <ColorSection 
              title="ダークテーマ (Dark)" 
              colors={colors.dark}
            />
          </div>

          {/* ステータスカラー */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">ステータスカラー</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <ColorSwatch name="Success" color={colors.status.success} />
              <ColorSwatch name="Error" color={colors.status.error} />
              <ColorSwatch name="Warning" color={colors.status.warning} />
              <ColorSwatch name="Info" color={colors.status.info} />
            </div>
          </div>

                    {/* テーマカラー（直接アクセス用） */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">テーマカラー（直接アクセス用）</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <ColorSwatch name="Primary" color={themeColors.primary} />
              <ColorSwatch name="Primary Light" color={themeColors.primaryLight} />
              <ColorSwatch name="Primary Dark" color={themeColors.primaryDark} />
              <ColorSwatch name="Accent" color={themeColors.accent} />
              <ColorSwatch name="Accent Light" color={themeColors.accentLight} />
              <ColorSwatch name="Background" color={themeColors.background} />
              <ColorSwatch name="Background Secondary" color={themeColors.backgroundSecondary} />
              <ColorSwatch name="Neutral" color={themeColors.neutral} />
              <ColorSwatch name="Success" color={themeColors.success} />
              <ColorSwatch name="Error" color={themeColors.error} />
              <ColorSwatch name="Warning" color={themeColors.warning} />
              <ColorSwatch name="Info" color={themeColors.info} />
            </div>
          </div>

          {/* 使用例 */}
          <div className="bg-white rounded-2xl shadow-soft p-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">使用例</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* ボタン例 */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">ボタン</h4>
                <div className="space-y-2">
                  <button className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Primary Button
                  </button>
                  <button className="w-full bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Accent Button
                  </button>
                  <button className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                    Gray Button
                  </button>
                </div>
              </div>

              {/* カード例 */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">カード</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-soft">
                  <h5 className="font-medium text-gray-900 mb-2">カードタイトル</h5>
                  <p className="text-gray-600 text-sm">カードの内容がここに表示されます。</p>
                </div>
              </div>

              {/* アラート例 */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">アラート</h4>
                <div className="space-y-2">
                  <div className="bg-green-100 border border-green-200 text-green-800 px-4 py-2 rounded-lg">
                    Success Alert
                  </div>
                  <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-2 rounded-lg">
                    Error Alert
                  </div>
                  <div className="bg-yellow-100 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-lg">
                    Warning Alert
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 