import { defineConfig } from "astro/config";
import remarkMath from "remark-math";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import vue from "@astrojs/vue";
const shikiConfig = {
  themes: {
    light: "vitesse-light",
    dark: "solarized-dark"
  },
  wrap: true
};


// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx(), vue()],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex, [rehypeExternalLinks, {
      rel: ["noopener", "noreferrer"],
      target: ["_blank"]
    }]],
    shikiConfig,
    // 示例：将脚注文本翻译成另一种语言，这里是默认的英文内容
    remarkRehype: {
      footnoteLabel: "参考",
      footnoteBackLabel: "Back to reference 1"
    }
  },
  devToolbar: {
    enabled: false
  }
});