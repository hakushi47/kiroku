// カラーコード設定 - Kiroku Earth Tone Colors
export const colors = {
  // メインテーマカラー（くすみローズ）
  primary: {
    50: '#fdf2f4',
    100: '#fce7ed',
    200: '#f9d0dd',
    300: '#f5a8c4',
    400: '#f075a3',
    500: '#A65D6D', // メインカラー（くすみローズ）
    600: '#8b4a5a',
    700: '#723d4b',
    800: '#5f3340',
    900: '#4f2d37',
  },
  
  // アクセントカラー（セージグリーン）
  accent: {
    50: '#f7f7f5',
    100: '#efede9',
    200: '#dfdcd6',
    300: '#c8c3bb',
    400: '#A89F91', // アクセントカラー（セージグリーン）
    500: '#9a9183',
    600: '#8a8173',
    700: '#726a5e',
    800: '#5f5850',
    900: '#4f4a43',
  },
  
  // 背景色（モーヴベージュ）
  background: {
    50: '#fdfcfb',
    100: '#E8DED6', // メイン背景色（モーヴベージュ）
    200: '#F2EAE3', // ライトモーヴベージュ
    300: '#DDD3CA', // ニュートラルベージュ
    400: '#c4b8ae',
    500: '#a99c90',
    600: '#8f8175',
    700: '#75685d',
    800: '#5f544b',
    900: '#4f463f',
  },
  
  // ダークテーマ背景色
  dark: {
    50: '#4A4038', // ニュートラルブラウン
    100: '#3A332C', // ミディアムブラウン
    200: '#2C2620', // ダークブラウン背景
    300: '#1f1a15',
    400: '#17130f',
    500: '#0f0c09',
    600: '#080604',
    700: '#040302',
    800: '#020101',
    900: '#010000',
  },
  
  // グレー系
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  
  // 成功・エラー・警告
  status: {
    success: '#10b981', // 緑
    error: '#ef4444',   // 赤
    warning: '#f59e0b', // オレンジ
    info: '#3b82f6',    // 青
  },
  
  // 白・黒
  white: '#ffffff',
  black: '#000000',
} as const;

// カラーユーティリティ関数
export const getColor = (colorPath: string): string => {
  const path = colorPath.split('.');
  let current: any = colors;
  
  for (const key of path) {
    if (current[key] === undefined) {
      console.warn(`Color not found: ${colorPath}`);
      return colors.gray[500];
    }
    current = current[key];
  }
  
  return current;
};

// テーマカラーの直接アクセス
export const themeColors = {
  primary: colors.primary[500],        // #A65D6D (くすみローズ)
  primaryLight: '#C48A96',             // ライトローズ
  primaryDark: '#3F3A38',              // スモーキーブラウン
  accent: colors.accent[400],          // #A89F91 (セージグリーン)
  accentLight: '#C4BDB7',              // ライトセージ
  background: colors.background[100],  // #E8DED6 (モーヴベージュ)
  backgroundSecondary: colors.background[200], // #F2EAE3 (ライトモーヴベージュ)
  neutral: colors.background[300],     // #DDD3CA (ニュートラルベージュ)
  success: colors.status.success,
  error: colors.status.error,
  warning: colors.status.warning,
  info: colors.status.info,
} as const;

// Tailwind CSS用のカスタムカラー設定
export const tailwindColors = {
  primary: {
    50: colors.primary[50],
    100: colors.primary[100],
    200: colors.primary[200],
    300: colors.primary[300],
    400: colors.primary[400],
    500: colors.primary[500],
    600: colors.primary[600],
    700: colors.primary[700],
    800: colors.primary[800],
    900: colors.primary[900],
  },
  accent: {
    50: colors.accent[50],
    100: colors.accent[100],
    200: colors.accent[200],
    300: colors.accent[300],
    400: colors.accent[400],
    500: colors.accent[500],
    600: colors.accent[600],
    700: colors.accent[700],
    800: colors.accent[800],
    900: colors.accent[900],
  },
} as const; 