'use client';

import React, { useState, useEffect } from 'react';
import { Question, QuestionType } from '@/lib/firebase';
import { Button } from './Button';
import { Input } from './Input';

interface QuestionEditorProps {
  question: Question | null;
  onSave: (question: Question) => void;
  onCancel: () => void;
}

export const QuestionEditor: React.FC<QuestionEditorProps> = ({
  question,
  onSave,
  onCancel
}) => {
  const [formData, setFormData] = useState<Partial<Question>>({
    title: '',
    type: 'text',
    required: false,
    placeholder: '',
    options: []
  });

  useEffect(() => {
    if (question) {
      setFormData({
        title: question.title,
        type: question.type,
        required: question.required,
        placeholder: question.placeholder || '',
        options: question.options || []
      });
    }
  }, [question]);

  const handleInputChange = (field: keyof Question, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...(prev.options || []), '']
    }));
  };

  const removeOption = (index: number) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }));
  };

  const updateOption = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options?.map((option, i) => i === index ? value : option) || []
    }));
  };

  const handleSave = () => {
    if (!question || !formData.title?.trim()) return;

    const updatedQuestion: Question = {
      ...question,
      title: formData.title.trim(),
      type: formData.type || 'text',
      required: formData.required || false,
      placeholder: formData.placeholder || undefined,
      options: (formData.type === 'radio' || formData.type === 'checkbox') 
        ? formData.options?.filter(opt => opt.trim()) || []
        : undefined
    };

    onSave(updatedQuestion);
  };

  if (!question) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">質問編集</h3>
        <p className="text-gray-500 text-center py-8">
          左側の質問を選択して編集してください
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">質問編集</h3>
      
      <div className="space-y-4">
        <Input
          label="質問タイトル"
          placeholder="質問を入力してください"
          value={formData.title || ''}
          onChange={(e) => handleInputChange('title', e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            質問タイプ
          </label>
          <select
            value={formData.type || 'text'}
            onChange={(e) => handleInputChange('type', e.target.value as QuestionType)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CA98B] focus:border-transparent"
          >
            <option value="text">テキスト入力（単一行）</option>
            <option value="textarea">テキストエリア（複数行）</option>
            <option value="radio">ラジオボタン（選択肢１つ）</option>
            <option value="checkbox">チェックボックス（複数選択可）</option>
            <option value="number">数字入力</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            checked={formData.required || false}
            onChange={(e) => handleInputChange('required', e.target.checked)}
            className="h-4 w-4 text-[#7CA98B] focus:ring-[#7CA98B] border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
            必須項目にする
          </label>
        </div>

        {(formData.type === 'text' || formData.type === 'textarea' || formData.type === 'number') && (
          <Input
            label="プレースホルダー"
            placeholder="プレースホルダーテキストを入力"
            value={formData.placeholder || ''}
            onChange={(e) => handleInputChange('placeholder', e.target.value)}
          />
        )}

        {(formData.type === 'radio' || formData.type === 'checkbox') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              選択肢
            </label>
            <div className="space-y-2">
              {formData.options?.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`選択肢 ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7CA98B] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-2 text-gray-400 hover:text-[#FFB6B6] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
              <Button
                type="button"
                onClick={addOption}
                variant="secondary"
                className="w-full"
              >
                選択肢を追加
              </Button>
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            onClick={handleSave}
            disabled={!formData.title?.trim()}
            className="flex-1"
          >
            保存
          </Button>
          <Button
            onClick={onCancel}
            variant="secondary"
            className="flex-1"
          >
            キャンセル
          </Button>
        </div>
      </div>
    </div>
  );
}; 