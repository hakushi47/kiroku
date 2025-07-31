/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // カスタムカラー設定 - Kiroku Earth Tone Colors
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
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 