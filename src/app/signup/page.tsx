'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signInWithGoogle } from '@/lib/firebase';
import { Button } from '@/components/Button';

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      router.push('/profile');
    } catch (error) {
      console.error('サインアップエラー:', error);
      setError('アカウント作成に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Kiroku アカウント作成
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            業務記録・顧客管理を始めましょう
          </p>
        </div>
        
        <div className="mt-8 space-y-6">
          {error && (
            <div className="bg-[#FFB6B6] border border-[#FFA5A5] text-white px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  アカウント作成中...
                </div>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Googleでアカウント作成
                </>
              )}
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600">
              既にアカウントをお持ちの方は{' '}
              <Link href="/login" className="font-medium text-[#7CA98B] hover:text-[#6B8A7A]">
                ログイン
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 