import defaultTheme from "tailwindcss/defaultTheme";
import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Arial", ...defaultTheme.fontFamily.sans],
        seri: ["Times New Roman", ...defaultTheme.fontFamily.serif],
        din: ["din", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  // 自定义暗色模式选择器 https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
  darkMode: ["selector", '[data-theme="dark"]'],
  daisyui: {
    themes: ["light", "dark"],
  },
};
