'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCounselingSheets, getSheetResponses } from '@/lib/firebase';
import Layout from '@/components/Layout';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalSheets: 0,
    totalResponses: 0
  });

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const sheets = await getCounselingSheets(user!.uid);
      let totalResponses = 0;
      
      for (const sheet of sheets) {
        const responses = await getSheetResponses(sheet.id);
        totalResponses += responses.length;
      }
      
      setStats({
        totalSheets: sheets.length,
        totalResponses
      });
    } catch (error) {
      console.error('統計情報読み込みエラー:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A0526A]"></div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <Layout title="ダッシュボード">
      <div className="max-w-7xl mx-auto">
        {/* 統計情報 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#A0526A] rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#666666]">作成済みシート</p>
                <p className="text-2xl font-bold text-[#333333]">{stats.totalSheets}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#A0526A] rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-[#666666]">総回答数</p>
                <p className="text-2xl font-bold text-[#333333]">{stats.totalResponses}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 機能カード（全て削除） */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          ...カード...
        </div> */}

        {/* 最近の活動 */}
        <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">最近の活動</h2>
          <div className="text-center py-8">
            <p className="text-[#666666]">最近の活動はありません</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 