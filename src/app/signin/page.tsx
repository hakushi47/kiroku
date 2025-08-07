'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // ここにログイン処理を実装
    console.log('Logging in with:', email, password);
  };

  const isDisabled = !email || !password;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#ede3db] px-2">
      <div className="w-full max-w-md rounded-[2.5rem] bg-[#ede3db] flex flex-col items-center py-6 px-2 shadow-none">
        {/* ロゴ部分 */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-md mb-2">
            K
          </div>
          <div className="text-2xl font-bold text-text">kiroku</div>
          <div className="text-sm text-text/70 mt-1">プロフェッショナルな接客記録管理</div>
        </div>

        {/* ログインフォームカード */}
        <div className="w-full bg-[#f7f0ea] rounded-2xl shadow-md p-6 mb-6">
          <div className="text-center text-lg font-medium text-text mb-4">ログイン</div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text mb-1">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-[#e2d3cb] bg-white px-4 py-2 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-text mb-1">
                パスワード
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-[#e2d3cb] bg-white px-4 py-2 text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-primary pr-10"
                  placeholder="パスワードを入力"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-text/50 hover:text-primary"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label="パスワード表示切替"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-.875 0-1.725-.112-2.538-.325" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-9.938-2.675A9.956 9.956 0 002 9c0 5.523 4.477 10 10 10s10-4.477 10-10c0-1.657-.336-3.234-.938-4.675" /></svg>
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#e2d3cb] text-primary focus:ring-primary"
              />
              <label htmlFor="rememberMe" className="text-sm text-text">
                ログイン状態を保持する
              </label>
            </div>
            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full rounded-lg py-3 font-bold flex items-center justify-center transition-colors duration-200 ${isDisabled ? 'bg-primary/30 text-white cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90'}`}
            >
              → ログイン
            </button>
          </form>
          <div className="mt-3 text-center">
            <Link href="/forgot-password" className="text-sm text-primary/80 hover:underline">
              パスワードをお忘れですか？
            </Link>
          </div>
        </div>

        {/* 新規登録カード */}
        <div className="w-full bg-[#f7f0ea] rounded-2xl shadow-md p-4 mb-6 flex flex-col items-center">
          <div className="text-sm text-text mb-2">まだアカウントをお持ちでないですか？</div>
          <Link
            href="/signup"
            className="w-full flex items-center justify-center rounded-lg py-3 font-bold text-primary border border-primary bg-white hover:bg-primary/10 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            新規登録
          </Link>
        </div>

        {/* フッター */}
        <div className="text-center text-xs text-text/60">
          Made with <span className="text-pink-400">♥</span> for professionals<br />
          © 2024 kiroku. All rights reserved.
        </div>
      </div>
    </div>
  );
}