import Link from "next/link";



export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text mb-4">
          Kiroku Appへようこそ
        </h1>
        <p className="text-lg text-text/80 mb-8">
          あなたの日々の記録を、もっとシンプルに。
        </p>
        <div className="space-x-4">
          <Link
            href="/signin"
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
          >
            ログイン
          </Link>
          <Link
            href="/signup"
            className="px-6 py-3 bg-white/80 text-primary font-bold rounded-lg hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary/50"
          >
            新規登録
          </Link>
        </div>
      </div>
    </main>
  );
}