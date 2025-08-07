import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    extend: {
      colors: {
        background: "#E8DED6",
        primary: "#A65D6D",
        text: "#3F3A38",
        accent: "#A89F91",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        'lg': '0.625rem', // 10px
        'md': '0.375rem', // 6px
      }
    },
  },
  plugins: [],
};
export default config;
