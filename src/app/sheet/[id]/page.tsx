'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { CounselingSheet, Question, submitSheetResponse, SheetResponse, Answer, getCounselingSheet } from '@/lib/firebase';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

export default function SheetResponsePage() {
  const params = useParams();
  const router = useRouter();
  const sheetId = params.id as string;
  
  const [sheet, setSheet] = useState<CounselingSheet | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadSheet();
  }, [sheetId]);

  const loadSheet = async () => {
    try {
      console.log('シート読み込み開始:', sheetId);
      
      // Firebaseから実際のシートデータを取得
      const sheetData = await getCounselingSheet(sheetId);
      
      if (!sheetData) {
        setError('シートが見つかりません。');
        return;
      }
      
      console.log('シートデータ取得完了:', sheetData);
      setSheet(sheetData);
    } catch (error) {
      console.error('シート読み込みエラー:', error);
      setError('シートの読み込みに失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const validateAnswers = () => {
    if (!sheet) return false;
    
    console.log('バリデーション開始:', { answers, questions: sheet.questions });
    
    for (const question of sheet.questions) {
      if (question.required) {
        const answer = answers[question.id];
        console.log(`質問 ${question.title}:`, { answer, required: question.required });
        
        if (!answer || (Array.isArray(answer) && answer.length === 0)) {
          console.log(`必須項目が未入力: ${question.title}`);
          return false;
        }
      }
    }
    
    console.log('バリデーション成功');
    return true;
  };

  const handleSubmit = async () => {
    if (!sheet || !validateAnswers()) {
      setError('必須項目を入力してください。');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      console.log('送信開始:', { sheetId: sheet.id, answers });
      
      const responseAnswers: Answer[] = sheet.questions.map(question => ({
        questionId: question.id,
        value: answers[question.id] || ''
      }));

      const response: SheetResponse = {
        id: '', // Firestoreが自動的にIDを生成する
        sheetId: sheet.id,
        answers: responseAnswers,
        submittedAt: new Date()
      };

      console.log('送信する回答:', response);
      
      await submitSheetResponse(response);
      console.log('送信完了');
      
      setMessage('回答を送信しました。ありがとうございます！');
      
      // フォームをリセット
      setAnswers({});
    } catch (error) {
      console.error('送信エラー詳細:', error);
      setError('回答の送信に失敗しました。もう一度お試しください。');
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: Question) => {
    const value = answers[question.id];

    switch (question.type) {
      case 'text':
        return (
          <Input
            key={question.id}
            label={question.title}
            placeholder={question.placeholder || ''}
            value={value || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            required={question.required}
          />
        );

      case 'textarea':
        return (
          <div key={question.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {question.title}
              {question.required && <span className="text-[#FFB6B6] ml-1">*</span>}
            </label>
            <textarea
              placeholder={question.placeholder || ''}
              value={value || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              required={question.required}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CA98B] focus:border-transparent text-gray-900 placeholder-gray-500"
            />
          </div>
        );

      case 'radio':
        return (
          <div key={question.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {question.title}
              {question.required && <span className="text-[#FFB6B6] ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name={question.id}
                    value={option}
                    checked={value === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    required={question.required}
                    className="h-4 w-4 text-[#7CA98B] focus:ring-[#7CA98B] border-gray-300"
                  />
                  <span className="ml-2 text-sm text-gray-900 font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div key={question.id} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {question.title}
              {question.required && <span className="text-[#FFB6B6] ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {question.options?.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    checked={Array.isArray(value) && value.includes(option)}
                    onChange={(e) => {
                      const currentValues = Array.isArray(value) ? value : [];
                      const newValues = e.target.checked
                        ? [...currentValues, option]
                        : currentValues.filter(v => v !== option);
                      handleAnswerChange(question.id, newValues);
                    }}
                    className="h-4 w-4 text-[#7CA98B] focus:ring-[#7CA98B] border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900 font-medium">{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'number':
        return (
          <Input
            key={question.id}
            label={question.title}
            type="number"
            placeholder={question.placeholder || ''}
            value={value || ''}
            onChange={(e) => handleAnswerChange(question.id, parseInt(e.target.value) || 0)}
            required={question.required}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7CA98B]"></div>
      </div>
    );
  }

  if (!sheet) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">シートが見つかりません</h1>
          <p className="text-gray-600">指定されたシートは存在しないか、削除された可能性があります。</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{sheet.title}</h1>
            {sheet.description && (
              <p className="text-gray-600">{sheet.description}</p>
            )}
          </div>

          {/* お客様情報表示 */}
          {sheet.customerInfo && (
            <div className="bg-[#F8F8F8] rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-[#333333]">お客様情報</h2>
                <button
                  onClick={() => router.push(`/sheet/${sheetId}/edit`)}
                  className="bg-[#A0526A] text-white px-3 py-1 rounded text-sm hover:bg-[#8B4A5A] transition-colors"
                >
                  編集
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                {sheet.customerInfo.name && (
                  <div>
                    <span className="font-medium text-[#666666]">お名前:</span>
                    <span className="ml-2 text-[#333333]">{sheet.customerInfo.name}</span>
                  </div>
                )}
                {sheet.customerInfo.age && (
                  <div>
                    <span className="font-medium text-[#666666]">年齢:</span>
                    <span className="ml-2 text-[#333333]">{sheet.customerInfo.age}</span>
                  </div>
                )}
                {sheet.customerInfo.preferences && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-[#666666]">好み・要望:</span>
                    <p className="mt-1 text-[#333333]">{sheet.customerInfo.preferences}</p>
                  </div>
                )}
                {sheet.customerInfo.notes && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-[#666666]">接客メモ:</span>
                    <p className="mt-1 text-[#333333]">{sheet.customerInfo.notes}</p>
                  </div>
                )}
                {sheet.customerInfo.contactInfo && (
                  <div className="md:col-span-2">
                    <span className="font-medium text-[#666666]">連絡先:</span>
                    <span className="ml-2 text-[#333333]">{sheet.customerInfo.contactInfo}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* お客様情報が未設定の場合の編集リンク */}
          {!sheet.customerInfo && (
            <div className="bg-[#F8F8F8] rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-[#333333] mb-2">お客様情報</h2>
                  <p className="text-[#666666] text-sm">お客様情報が未設定です</p>
                </div>
                <button
                  onClick={() => router.push(`/sheet/${sheetId}/edit`)}
                  className="bg-[#A0526A] text-white px-4 py-2 rounded-lg hover:bg-[#8B4A5A] transition-colors"
                >
                  お客様情報を追加
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="mb-4 bg-[#7CA98B] text-white px-4 py-3 rounded-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-4 bg-[#FFB6B6] text-white px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            {/* 質問 */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">ご回答</h2>
              <div className="space-y-6">
                {sheet.questions
                  .sort((a, b) => a.order - b.order)
                  .map(renderQuestion)}
              </div>
            </div>

            {/* 送信ボタン */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={submitting || !validateAnswers()}
                className="px-8 py-3 text-lg"
              >
                {submitting ? '送信中...' : '回答を送信'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 