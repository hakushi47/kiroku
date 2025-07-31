'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { CounselingSheet, SheetResponse, getCounselingSheets, getSheetResponses } from '@/lib/firebase';
import { Button } from '@/components/Button';

export default function ResponsesPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [sheets, setSheets] = useState<CounselingSheet[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<CounselingSheet | null>(null);
  const [responses, setResponses] = useState<SheetResponse[]>([]);
  const [loadingSheets, setLoadingSheets] = useState(true);
  const [loadingResponses, setLoadingResponses] = useState(false);

  // 認証状態チェック
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // シート一覧を取得
  useEffect(() => {
    if (user) {
      loadSheets();
    }
  }, [user]);

  const loadSheets = async () => {
    if (!user) return;
    
    try {
      setLoadingSheets(true);
      console.log('シート取得開始:', user.uid);
      const userSheets = await getCounselingSheets(user.uid);
      console.log('シート取得完了:', userSheets);
      setSheets(userSheets);
      
      if (userSheets.length > 0) {
        setSelectedSheet(userSheets[0]);
        loadResponses(userSheets[0].id);
      }
    } catch (error) {
      console.error('シート取得エラー詳細:', error);
    } finally {
      setLoadingSheets(false);
    }
  };

  const loadResponses = async (sheetId: string) => {
    try {
      setLoadingResponses(true);
      const sheetResponses = await getSheetResponses(sheetId);
      setResponses(sheetResponses);
    } catch (error) {
      console.error('回答取得エラー:', error);
    } finally {
      setLoadingResponses(false);
    }
  };

  const handleSheetChange = (sheet: CounselingSheet) => {
    setSelectedSheet(sheet);
    loadResponses(sheet.id);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getAnswerValue = (response: SheetResponse, questionId: string) => {
    const answer = response.answers.find(a => a.questionId === questionId);
    if (!answer) return '未回答';
    
    if (Array.isArray(answer.value)) {
      return answer.value.join(', ');
    }
    
    return String(answer.value);
  };

  if (loading || loadingSheets) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7CA98B]"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => router.push('/')}
                variant="secondary"
              >
                ← ホームに戻る
              </Button>
              <h1 className="text-2xl font-bold text-gray-900">回答一覧</h1>
            </div>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {sheets.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">シートがありません</h2>
            <p className="text-gray-600 mb-4">
              まずはカウンセリングシートを作成してください。
            </p>
            <Button
              onClick={() => router.push('/sheet-builder')}
            >
              シートを作成
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* 左サイドバー：シート選択 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">シート選択</h2>
                <div className="space-y-2">
                  {sheets.map((sheet) => (
                    <button
                      key={sheet.id}
                      onClick={() => handleSheetChange(sheet)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        selectedSheet?.id === sheet.id
                          ? 'border-[#7CA98B] bg-[#7CA98B] text-white'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-medium">{sheet.title}</h3>
                      <p className="text-sm opacity-75">
                        {formatDate(sheet.updatedAt)}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* メインコンテンツ：回答一覧 */}
            <div className="lg:col-span-3">
              {selectedSheet && (
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{selectedSheet.title}</h2>
                      {selectedSheet.description && (
                        <p className="text-gray-600 mt-1">{selectedSheet.description}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">回答数: {responses.length}</p>
                    </div>
                  </div>

                  {loadingResponses ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7CA98B]"></div>
                    </div>
                  ) : responses.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">まだ回答がありません</p>
                      <p className="text-sm text-gray-400 mt-2">
                        QRコードを共有して回答を収集してください
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {responses.map((response) => (
                        <div key={response.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                回答 #{response.id.slice(-8)}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {formatDate(response.submittedAt)}
                              </p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            {selectedSheet.questions
                              .sort((a, b) => a.order - b.order)
                              .map((question) => (
                                <div key={question.id} className="border-l-4 border-[#7CA98B] pl-4">
                                  <h4 className="font-medium text-gray-900 mb-1">
                                    {question.title}
                                  </h4>
                                  <p className="text-gray-700">
                                    {getAnswerValue(response, question.id)}
                                  </p>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 