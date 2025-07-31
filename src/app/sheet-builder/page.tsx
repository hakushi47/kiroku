'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { Question, QuestionType, CounselingSheet, saveCounselingSheet } from '@/lib/firebase';
import { QuestionCard } from '@/components/QuestionCard';
import { QuestionEditor } from '@/components/QuestionEditor';
import { QRCodeGenerator } from '@/components/QRCodeGenerator';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import Layout from '@/components/Layout';

export default function SheetBuilderPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  
  const [sheet, setSheet] = useState<CounselingSheet>({
    id: '',
    title: '新しいカウンセリングシート',
    description: '',
    questions: [],
    createdAt: new Date(),
    updatedAt: new Date()
  });
  
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showQR, setShowQR] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 認証状態チェック
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // シートIDの生成
  useEffect(() => {
    if (!sheet.id) {
      setSheet(prev => ({
        ...prev,
        id: `sheet_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
    }
  }, [sheet.id]);

  const addQuestion = (type: QuestionType) => {
    const newQuestion: Question = {
      id: `question_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title: '',
      required: false,
      order: sheet.questions.length,
      options: type === 'radio' || type === 'checkbox' ? [''] : null,
      placeholder: null
    };

    setSheet(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    setSelectedQuestion(newQuestion);
  };

  const updateQuestion = (updatedQuestion: Question) => {
    setSheet(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    }));
    setSelectedQuestion(null);
  };

  const deleteQuestion = (questionId: string) => {
    setSheet(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
    
    if (selectedQuestion?.id === questionId) {
      setSelectedQuestion(null);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setSheet(prev => {
        const oldIndex = prev.questions.findIndex(q => q.id === active.id);
        const newIndex = prev.questions.findIndex(q => q.id === over?.id);

        const newQuestions = arrayMove(prev.questions, oldIndex, newIndex);
        
        // orderを更新
        const updatedQuestions = newQuestions.map((q, index) => ({
          ...q,
          order: index
        }));

        return {
          ...prev,
          questions: updatedQuestions
        };
      });
    }
  };

  const handleSave = async () => {
    if (!user) {
      setError('ユーザーが認証されていません。');
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      console.log('保存開始:', { userId: user.uid, sheet });
      
      const sheetToSave = {
        ...sheet,
        updatedAt: new Date()
      };

      console.log('保存するシート:', sheetToSave);
      
      await saveCounselingSheet(user.uid, sheetToSave);
      setMessage('シートが保存されました！');
      
      // 3秒後にメッセージを消す
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('保存エラー詳細:', error);
      setError(`シートの保存に失敗しました: ${error instanceof Error ? error.message : '不明なエラー'}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
    <Layout title="カウンセリングシートビルダー">
      <div className="max-w-7xl mx-auto">
        {/* アクションボタン */}
        <div className="flex justify-end space-x-2 mb-6">
          <Button
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '保存中...' : 'シートを保存'}
          </Button>
          <Button
            onClick={() => setShowQR(!showQR)}
            variant="secondary"
            disabled={!sheet.id || sheet.questions.length === 0}
          >
            {showQR ? 'QRコードを隠す' : 'QRコード生成'}
          </Button>
          {sheet.id && (
            <Button
              onClick={() => router.push(`/sheet/${sheet.id}/edit`)}
              variant="secondary"
            >
              お客様情報編集
            </Button>
          )}
          <Button
            onClick={() => {
              // テスト用：サンプル質問を追加
              const testQuestion = {
                id: `test_${Date.now()}`,
                type: 'text' as QuestionType,
                title: 'テスト質問',
                required: false,
                order: 0,
                placeholder: null,
                options: null
              };
              setSheet(prev => ({
                ...prev,
                questions: [testQuestion]
              }));
            }}
            variant="secondary"
          >
            テスト質問追加
          </Button>
        </div>

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

        {/* シート基本情報 */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">シート基本情報</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="シートタイトル"
              placeholder="カウンセリングシートのタイトルを入力"
              value={sheet.title}
              onChange={(e) => setSheet(prev => ({ ...prev, title: e.target.value }))}
              required
            />
            <Input
              label="説明"
              placeholder="シートの説明を入力（任意）"
              value={sheet.description || ''}
              onChange={(e) => setSheet(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>
        </div>

        {/* QRコード生成 */}
        {showQR && (
          <div className="mb-8">
            <QRCodeGenerator
              sheet={sheet}
              baseUrl={typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左ペイン：質問追加 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">質問を追加</h3>
              
              <div className="space-y-3">
                <Button
                  onClick={() => addQuestion('text')}
                  variant="secondary"
                  className="w-full justify-start"
                >
                  📝 テキスト入力（単一行）
                </Button>
                
                <Button
                  onClick={() => addQuestion('textarea')}
                  variant="secondary"
                  className="w-full justify-start"
                >
                  📄 テキストエリア（複数行）
                </Button>
                
                <Button
                  onClick={() => addQuestion('radio')}
                  variant="secondary"
                  className="w-full justify-start"
                >
                  🔘 ラジオボタン（選択肢１つ）
                </Button>
                
                <Button
                  onClick={() => addQuestion('checkbox')}
                  variant="secondary"
                  className="w-full justify-start"
                >
                  ☑️ チェックボックス（複数選択可）
                </Button>
                
                <Button
                  onClick={() => addQuestion('number')}
                  variant="secondary"
                  className="w-full justify-start"
                >
                  🔢 数字入力
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">質問数: {sheet.questions.length}</p>
                <p className="text-xs text-gray-500">
                  質問をドラッグ＆ドロップで並び替えることができます
                </p>
              </div>
            </div>
          </div>

          {/* 中央：質問リスト */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">質問リスト</h3>
              
              {sheet.questions.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">まだ質問がありません</p>
                  <p className="text-sm text-gray-400">
                    左側のボタンから質問を追加してください
                  </p>
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                  modifiers={[restrictToVerticalAxis]}
                >
                  <SortableContext
                    items={sheet.questions.map(q => q.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-3">
                      {sheet.questions.map((question) => (
                        <QuestionCard
                          key={question.id}
                          question={question}
                          isSelected={selectedQuestion?.id === question.id}
                          onSelect={setSelectedQuestion}
                          onDelete={deleteQuestion}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </div>
          </div>

          {/* 右ペイン：質問編集 */}
          <div className="lg:col-span-1">
            <QuestionEditor
              question={selectedQuestion}
              onSave={updateQuestion}
              onCancel={() => setSelectedQuestion(null)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
} 