# Kiroku - 業務記録・顧客管理Webアプリ

風俗キャスト向けの業務記録・顧客管理Webアプリケーションです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **認証**: Firebase Authentication
- **データベース**: Firebase Firestore
- **フォーム管理**: React Hook Form

## 機能

### 認証機能
- Google OAuthログイン
- 認証状態に応じたルーティング制御
- 未ログインユーザーの自動リダイレクト

### プロフィール管理
- 源氏名・店舗名の編集
- コース情報の管理（複数登録可能）
  - コース名
  - 時間（分単位）
  - 料金（円単位）
- バック情報の管理（複数登録可能）
  - バック名
  - 時間（分単位）
  - 料金（円単位）

## セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/あなたのユーザー名/kiroku.git
cd kiroku
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. Firebase設定

1. [Firebase Console](https://console.firebase.google.com/)で新しいプロジェクトを作成
2. AuthenticationでGoogleログインを有効化
3. Firestore Databaseを作成
4. プロジェクト設定からWebアプリを追加
5. 設定値をコピー

### 4. 環境変数の設定

プロジェクトルートに`.env.local`ファイルを作成し、以下の内容を入力：

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## デプロイ

### Vercelでのデプロイ

1. [Vercel](https://vercel.com)にアカウントを作成
2. GitHubリポジトリをインポート
3. 環境変数を設定
4. デプロイ完了！

### その他のプラットフォーム

- **Netlify**: 同様にGitHubリポジトリをインポート
- **Firebase Hosting**: `firebase init`で設定

## プロジェクト構造

```
src/
├── app/                    # App Router ページ
│   ├── login/             # ログインページ
│   ├── signup/            # サインアップページ
│   ├── profile/           # プロフィール編集ページ
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # 共通UIコンポーネント
│   ├── Button.tsx         # ボタンコンポーネント
│   └── Input.tsx          # 入力フィールドコンポーネント
├── contexts/              # React Context
│   └── AuthContext.tsx    # 認証状態管理
└── lib/                   # ユーティリティ
    └── firebase.ts        # Firebase設定・関数
```

## カラーテーマ

アプリケーションでは以下のカラーテーマを使用しています：

- **プライマリー**: `#7CA98B` (緑)
- **セカンダリー**: `#FFB6B6` (ピンク)
- **背景**: `#F5F5F5` (ライトグレー)

## 今後の機能予定

- 業務記録機能
- 顧客管理機能
- 統計・分析機能
- プッシュ通知

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
