"use client";
import { useState } from "react";
import Link from "next/link";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("すべての項目を入力してください。");
      return;
    }
    if (password !== confirmPassword) {
      setError("パスワードが一致しません。");
      return;
    }
    if (password.length < 8) {
      setError("パスワードは8文字以上で入力してください。");
      return;
    }

    // TODO: 登録API連携
    console.log("Register attempt:", { email, password });
    alert("登録処理を実装してください。");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/50 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center text-text">新規登録"</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email"
            className="text-sm font-bold text-gray-600 block"
            >
              メールアドレス
            </label>
            <input 
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
        </div>
        <div>
          <label 
            htmlFor="password"
            className="text-sm font-bold text-gray-600 block"
            >
              パスワード
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
        </div>
        <div>
            <label 
            htmlFor="confirmPassword"
            className="text-sm font-bold text-gray-600 block"
            >
            パスワード(確認用)
            </label>
            <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/50 focus:outline-none"
            required
            />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div>
          <button 
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/50"
          >
            登録する
          </button>    
        </div>
      </form>
      <div className="text-sm text-center">
        <p>
          すでにアカウントをお持ちですか？{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            ログインはこちら
          </Link>
        </p>
      </div>
      </div>
    </div>
  );

};
export default SignupPage;