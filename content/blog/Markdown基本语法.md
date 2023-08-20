---
title: "Markdown 基本语法"
date: 2019-11-27
draft: false
---

# 1 段落

永和[^1]九年，岁在癸丑，暮春之初，会于会稽山[^2]阴之兰亭，修禊事也。群贤毕至，少长咸集。此地有崇山峻岭，茂林修竹，又有清流激湍，映带左右，引以为流觞曲水，列坐其次。虽无丝竹管弦之盛，一觞一咏，亦足以畅叙幽情。

是日也，天朗气清，惠风和畅。仰观宇宙之大，俯察品类之盛，所以游目骋怀，足以极视听之娱，信可乐也。

夫人之相与，俯仰一世。或取诸怀抱，悟言一室之内；或因寄所托，放浪形骸之外。虽趣舍万殊，静躁不同，当其欣于所遇，暂得于己，快然自足，不知老之将至；及其所之既倦，情随事迁，感慨系之矣。向之所欣，俯仰之间，已为陈迹，犹不能不以之兴怀，况修短随化，终期于尽！古人云：“死生亦大矣。”岂不痛哉！

每览昔人兴感之由，若合一契，未尝不临文嗟悼，不能喻之于怀。固知一死生为虚诞，齐彭殇为妄作。后之视今，亦犹今之视昔，悲夫！故列叙时人，录其所述，虽世殊事异，所以兴怀，其致一也。后之览者，亦将有感于斯文。

# 2 行内样式

**强调** | _斜体_ | **_强调和斜体_** | `行间代码code` | <u>下划线</u> | ~~删除线~~

# 3 引用

> 《兰亭集序》，又题为《临河序》、《禊帖》、《三月三日兰亭诗序》等。晋穆帝永和九年（公元 353）三月三日，时任会稽内史的王羲之与友人谢安、孙绰等四十一人会聚兰亭，赋诗饮酒。王羲之将诸人名爵及所赋诗作编成一集，并作序一篇，记述流觞曲水一事，并抒写由此而引发的内心感慨。这篇序文就是《兰亭集序》。此序受石崇《金谷诗序》影响很大，其成就又远在《金谷诗序》之上。

## 嵌套引用

> 文章首先记述了集会的时间、地点及与会人物，言简意赅。接着描绘兰亭所处的自然环境和周围景物，语言简洁而层次井然。描写景物，从大处落笔，由远及近，转而由近及远，推向无限。先写崇山峻岭，渐写清流激湍，再顺流而下转写人物活动及其情态，动静结合。然后再补写自然物色，由晴朗的碧空和轻扬的春风，自然地推向寥廓的宇宙及大千世界中的万物。意境清丽淡雅，情调欢快畅达。兰亭宴集，真可谓“四美俱，二难并”。
>
> > 第一至第二自然段，记叙了集会的时间、地点、事由、人物，由“此地有崇山峻岭”引出四周环境及场面的铺叙，最后由“是日也”领起描写游人的心境，抒发集会的心情。本文第一、二自然段作者对这次宴集环境的描述素淡雅致，摄其神韵，天朗气清，惠风和畅，这些都看出作者快乐的心情和对自然美的热爱之情。
> > 用于在文档中引用其他来源的内容块.

# 4 列表

## 无序列表

- Lorem ipsum dolor sit amet
- Consectetur adipiscing elit
- Integer molestie lorem at massa

## 有序列表

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## 任务列表

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

# 5 代码

## 缩进代码

    line 1 of code
    line 2 of code
    line 3 of code

## 代码块

```javascript
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./templates/**/*.html"],
  theme: {
    fontFamily: {
      ubuntu: ["ubuntu", ...defaultTheme.fontFamily.sans],
      din: ["din", ...defaultTheme.fontFamily.sans],
      serif: [...defaultTheme.fontFamily.serif],
      sans: ["din", defaultTheme.fontFamily.sans],
      mono: ["CascadiaMono", ...defaultTheme.fontFamily.mono],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
```

# 6 表格

| Left-Aligned  | Center Aligned  | Right Aligned |
| :------------ | :-------------: | ------------: |
| col 3 is      | some wordy text |         $1600 |
| col 2 is      |    centered     |           $12 |
| zebra stripes |    are neat     |            $1 |

# 7 图片

![img](https://picsum.photos/600/400/?random)

# 8 公式

$P_{1}(z_{1},x_{1},\theta_{1})$

$$
e^{i \pi}+1=0
$$

# Reference

[^1]: 永和：东晋皇帝司马聃（晋穆帝）的年号，从公元 345—356 年共 12 年。永和九年上巳节，王羲之与谢安，孙绰等 41 人。举行禊礼，饮酒赋诗，事后将作品结为一集，由王羲之写了这篇序总述其事。

[^2]: 郡名，今浙江绍兴
