import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-xl font-bold">Kiroku</span>
            </div>
            <p className="text-gray-300 mb-4">
              ホスピタリティ業界で働く女性のための、安全で使いやすい記録管理アプリ
            </p>
            <p className="text-sm text-gray-400">
              © 2024 Kiroku. All rights reserved.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">機能</h3>
            <ul className="space-y-2 text-gray-300">
              <li>カウンセリングシート</li>
              <li>QRコード生成</li>
              <li>顧客管理</li>
              <li>データ分析</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">サポート</h3>
            <ul className="space-y-2 text-gray-300">
              <li>ヘルプセンター</li>
              <li>プライバシーポリシー</li>
              <li>利用規約</li>
              <li>お問い合わせ</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 