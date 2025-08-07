"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage(){
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if(!email || !password){
      setError("メールアドレスとパスワードを入力してください。");
      return;
    }

    // TODO: ログインAPI連携
    console.log("Login attempt:", {email, password});
    alert("ログイン処理を実装してください");
    };
  
    return(
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/50 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-text">ログイン</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              メールアドレス
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 border border-gray rounded-md focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              パスワード
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 border border-gray rounded-md focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
              >ログイン</button>

    
            </div>
          </div>
        </form>
        <div className="text-center text-sm">
          <Link href="/password-reset" className="font-medium text-primary hover:underline">
          パスワードを忘れた方はこちら"
          </Link>
        </div>
        <div className="text-center text-sm">
          <p>アカウントをお持ちでない方はこちら{" "}
          <Link href="/signup" className="font-medium text-primary hover:underline">
            登録はこちら
          </Link>
          </p>
        </div>
        </div>
      </div>
    );
}