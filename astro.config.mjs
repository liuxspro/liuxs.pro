// @ts-check
import { defineConfig } from "astro/config";
import { satteri } from "@astrojs/markdown-satteri";
import { satteriMathjax } from "satteri-mathjax";

import tailwindcss from "@tailwindcss/vite";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    processor: satteri({
      features: {
        math: true,
        rawHtml: true,
        gfm: {
          footnotes: { label: "参考" },
        },
      },
      mdastPlugins: [satteriMathjax()],
    }),
    shikiConfig: {
      theme: "snazzy-light",
    },
  },

  integrations: [mdx()],
});
