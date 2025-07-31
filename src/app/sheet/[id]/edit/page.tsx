'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCounselingSheet, saveCounselingSheet, CustomerInfo, CounselingSheet } from '@/lib/firebase';

export default function SheetEditPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const sheetId = params.id as string;
  
  const [sheet, setSheet] = useState<any>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    age: '',
    preferences: '',
    notes: '',
    contactInfo: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user && sheetId) {
      loadSheet();
    }
  }, [user, sheetId]);

  const loadSheet = async () => {
    try {
      const sheetData = await getCounselingSheet(sheetId);
      if (sheetData) {
        setSheet(sheetData);
        
        // 既存のお客様情報があれば読み込み
        if (sheetData.customerInfo) {
          setCustomerInfo(sheetData.customerInfo);
        }
      }
    } catch (error) {
      console.error('シート読み込みエラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCustomerInfoChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    if (!sheet) return;
    
    setIsSaving(true);
    try {
      const updatedSheet = {
        ...sheet,
        customerInfo,
        updatedAt: new Date()
      };
      
      await saveCounselingSheet(user!.uid, updatedSheet);
      alert('お客様情報を保存しました');
      router.push(`/sheet/${sheetId}`);
    } catch (error) {
      console.error('保存エラー:', error);
      alert('保存に失敗しました');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
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

  if (!sheet) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-[#333333] mb-2">シートが見つかりません</h2>
          <button
            onClick={() => router.push('/sheet-builder')}
            className="bg-[#A0526A] text-white px-4 py-2 rounded-lg hover:bg-[#8B4A5A] transition-colors"
          >
            シート一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#333333] mb-2">
              {sheet.title} - お客様情報編集
            </h1>
            <p className="text-[#666666]">
              カウンセリングシートからお客様情報を編集できます
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => router.push(`/sheet/${sheetId}`)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              キャンセル
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#A0526A] text-white px-4 py-2 rounded-lg hover:bg-[#8B4A5A] transition-colors disabled:opacity-50"
            >
              {isSaving ? '保存中...' : '保存'}
            </button>
          </div>
        </div>

        {/* お客様情報フォーム */}
        <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">お客様情報</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                お客様のお名前
              </label>
              <input
                type="text"
                value={customerInfo.name}
                onChange={(e) => handleCustomerInfoChange('name', e.target.value)}
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
                placeholder="お客様のお名前を入力"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                年齢
              </label>
              <input
                type="text"
                value={customerInfo.age}
                onChange={(e) => handleCustomerInfoChange('age', e.target.value)}
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
                placeholder="年齢を入力"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#666666] mb-2">
                好み・要望
              </label>
              <textarea
                value={customerInfo.preferences}
                onChange={(e) => handleCustomerInfoChange('preferences', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
                placeholder="お客様の好みやご要望を入力"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#666666] mb-2">
                接客メモ
              </label>
              <textarea
                value={customerInfo.notes}
                onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
                placeholder="接客時のメモや記録を入力"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#666666] mb-2">
                連絡先情報
              </label>
              <input
                type="text"
                value={customerInfo.contactInfo}
                onChange={(e) => handleCustomerInfoChange('contactInfo', e.target.value)}
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
                placeholder="連絡先情報を入力（任意）"
              />
            </div>
          </div>
        </div>

        {/* シート情報表示 */}
        <div className="bg-[#F8F8F8] rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#333333] mb-6">シート情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                シートタイトル
              </label>
              <p className="text-[#333333] font-medium">{sheet.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                作成日
              </label>
              <p className="text-[#333333]">
                {sheet.createdAt ? new Date(sheet.createdAt).toLocaleDateString('ja-JP') : '不明'}
              </p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#666666] mb-2">
                説明
              </label>
              <p className="text-[#333333]">{sheet.description || '説明なし'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 