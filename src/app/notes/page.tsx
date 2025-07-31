'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

export default function NotesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

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
    <Layout title="接客メモ">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#333333] mb-4">接客メモ管理</h2>
          <p className="text-[#666666] mb-6">
            接客時のメモや記録を管理する機能は現在開発中です。
          </p>
          <div className="text-center py-8">
            <p className="text-[#666666]">接客メモ機能は準備中です</p>
          </div>
        </div>
      </div>
    </Layout>
  );
} 