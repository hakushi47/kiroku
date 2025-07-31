'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/Button';
import { signOutUser } from '@/lib/firebase';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOutUser();
      router.push('/login');
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7CA98B]"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Kiroku</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                ようこそ、{user.displayName || user.email}さん
              </span>
              <Button
                onClick={handleLogout}
                variant="secondary"
              >
                ログアウト
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            業務記録・顧客管理システム
          </h2>
          <p className="text-xl text-gray-600">
            効率的に業務を管理し、顧客との関係を築きましょう
          </p>
        </div>

        {/* 機能カード */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="w-12 h-12 bg-[#7CA98B] rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">プロフィール管理</h3>
            <p className="text-gray-600 mb-4">
              源氏名、店舗名、コース情報、バック情報を管理できます
            </p>
            <Button
              onClick={() => router.push('/profile')}
              className="w-full"
            >
              プロフィールを編集
            </Button>
          </div>

                     <div className="bg-white rounded-lg shadow-lg p-6">
             <div className="w-12 h-12 bg-[#FFB6B6] rounded-lg flex items-center justify-center mb-4">
               <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
               </svg>
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2">カウンセリングシート</h3>
             <p className="text-gray-600 mb-4">
               接客時に使うカウンセリングシートを作成・管理できます
             </p>
             <Button
               onClick={() => handleNavigation('/sheet-builder')}
               className="w-full"
             >
               シートを作成
             </Button>
           </div>

                     <div className="bg-white rounded-lg shadow-lg p-6">
             <div className="w-12 h-12 bg-[#F5F5F5] rounded-lg flex items-center justify-center mb-4">
               <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
             </div>
             <h3 className="text-xl font-semibold text-gray-900 mb-2">回答一覧</h3>
             <p className="text-gray-600 mb-4">
               お客様からの回答を確認・管理できます
             </p>
             <Button
               onClick={() => handleNavigation('/responses')}
               className="w-full"
             >
               回答を確認
             </Button>
           </div>
        </div>

        {/* 統計情報 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">統計情報</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#7CA98B]">0</div>
              <div className="text-sm text-gray-600">作成シート</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FFB6B6]">0</div>
              <div className="text-sm text-gray-600">総回答数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">0</div>
              <div className="text-sm text-gray-600">今日の回答</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
