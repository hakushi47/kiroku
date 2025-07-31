'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithGoogle, signUpWithEmail } from '@/lib/firebase';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (error) {
      console.error('Googleサインアップエラー:', error);
      setError('Googleアカウント作成に失敗しました。もう一度お試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // パスワード確認
    if (password !== confirmPassword) {
      setError('パスワードが一致しません。');
      setLoading(false);
      return;
    }
    
    // パスワード強度チェック
    if (password.length < 6) {
      setError('パスワードは6文字以上で入力してください。');
      setLoading(false);
      return;
    }
    
    try {
      await signUpWithEmail(email, password);
      router.push('/dashboard');
    } catch (error: any) {
      console.error('メールサインアップエラー:', error);
      if (error.code === 'auth/email-already-in-use') {
        setError('このメールアドレスは既に使用されています。');
      } else if (error.code === 'auth/invalid-email') {
        setError('メールアドレスの形式が正しくありません。');
      } else if (error.code === 'auth/weak-password') {
        setError('パスワードが弱すぎます。6文字以上で入力してください。');
      } else {
        setError('アカウント作成に失敗しました。もう一度お試しください。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-[#F8F8F8] rounded-lg shadow-md p-8">
          {/* ロゴ */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-[#A0526A] rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <h2 className="text-3xl font-bold text-[#333333] mb-2">
              新規登録
            </h2>
            <p className="text-sm text-[#666666]">
              Kirokuで安全な記録管理を始めましょう
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {/* Googleサインアップボタン */}
          <button
            onClick={handleGoogleSignup}
            disabled={loading}
            className="w-full bg-white border border-gray-300 text-[#333333] px-4 py-3 rounded-lg flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Googleでアカウント作成
          </button>

          {/* 区切り線 */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#F8F8F8] text-[#666666]">または</span>
            </div>
          </div>

          {/* メール/パスワードサインアップフォーム */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                パスワード
              </label>
              <input
                type="password"
                placeholder="6文字以上で入力"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#666666] mb-2">
                パスワード確認
              </label>
              <input
                type="password"
                placeholder="パスワードを再入力"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[#E0E0E0] border-0 rounded-lg text-[#333333] placeholder-[#999999] focus:outline-none focus:ring-2 focus:ring-[#A0526A] focus:ring-opacity-50"
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#A0526A] text-white px-4 py-3 rounded-lg font-medium hover:bg-[#8B4A5A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'アカウント作成中...' : 'アカウント作成'}
            </button>
          </form>

          {/* ログインリンク */}
          <div className="text-center mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-[#666666] mb-2">
              既にアカウントをお持ちの方
            </p>
            <a 
              href="/login" 
              className="text-[#4A90E2] font-medium hover:text-[#357ABD] transition-colors"
            >
              ログインはこちら
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 