'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Question, QuestionType } from '@/lib/firebase';

interface QuestionCardProps {
  question: Question;
  isSelected: boolean;
  onSelect: (question: Question) => void;
  onDelete: (id: string) => void;
}

const getQuestionTypeLabel = (type: QuestionType): string => {
  switch (type) {
    case 'text': return 'テキスト入力';
    case 'textarea': return 'テキストエリア';
    case 'radio': return 'ラジオボタン';
    case 'checkbox': return 'チェックボックス';
    case 'number': return '数字入力';
    default: return '不明';
  }
};

const getQuestionTypeIcon = (type: QuestionType): string => {
  switch (type) {
    case 'text': return '📝';
    case 'textarea': return '📄';
    case 'radio': return '🔘';
    case 'checkbox': return '☑️';
    case 'number': return '🔢';
    default: return '❓';
  }
};

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  isSelected,
  onSelect,
  onDelete
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`bg-white border-2 rounded-lg p-4 cursor-move hover:shadow-md transition-all ${
        isSelected 
          ? 'border-[#7CA98B] shadow-lg' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onSelect(question)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{getQuestionTypeIcon(question.type)}</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
              {getQuestionTypeLabel(question.type)}
            </span>
            {question.required && (
              <span className="text-xs bg-[#FFB6B6] text-white px-2 py-1 rounded">
                必須
              </span>
            )}
          </div>
          
          <h3 className="font-medium text-gray-900 mb-2">
            {question.title || '無題の質問'}
          </h3>
          
          {question.placeholder && (
            <p className="text-sm text-gray-500 mb-2">
              プレースホルダー: {question.placeholder}
            </p>
          )}
          
          {question.options && question.options.length > 0 && (
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">選択肢:</p>
              <ul className="list-disc list-inside space-y-1">
                {question.options.slice(0, 3).map((option, index) => (
                  <li key={index} className="text-gray-500">
                    {option}
                  </li>
                ))}
                {question.options.length > 3 && (
                  <li className="text-gray-400">
                    ...他{question.options.length - 3}件
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(question.id);
          }}
          className="ml-2 p-1 text-gray-400 hover:text-[#FFB6B6] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}; 