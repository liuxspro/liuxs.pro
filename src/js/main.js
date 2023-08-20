function apply_theme() {
  const current_theme = localStorage.getItem("theme");
  //如果localStorage存了主题信息，则根据主题信息设置
  if (current_theme) {
    if (current_theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } else {
    //否则查询系统设置
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  }
}

function toogle_theme() {
  const current_theme = localStorage.getItem("theme");
  if (current_theme) {
    if (current_theme == "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    } else {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    }
  }
}

function getActiveTocElement() {
  const toc = document.querySelectorAll("h1");
  const current = [...toc].filter((item) => item.getBoundingClientRect().y < 0);
  // console.log([...toc].map((item) => item.getBoundingClientRect().y));
  // 取最后一个y小于0的元素,如果都不小于0,就返回第一个
  if (current.length == 0) {
    return toc[0];
  }
  return current.reverse()[0];
}

function markToc() {
  const activetoc = getActiveTocElement();
  if (activetoc) {
    const id = activetoc.id;
    toclist = document.querySelectorAll("#toc li a");
    // 取消所有active
    toclist.forEach((element) => {
      element.dataset.active = false;
    });
    toclist_ids = [...toclist].map((item) => item.href.split("/#").reverse()[0]);
    index = toclist_ids.indexOf(id);
    current = toclist[index];
    current.dataset.active = true;
  }
}

//给脚注增加返回链接
function addBackRef() {
  const ref = document.querySelectorAll("sup.footnote-reference a");
  const footnote = document.querySelectorAll("div.footnote-definition");
  ref.forEach((item) => {
    href = item.getAttribute("href").split("#")[1];
    item.parentElement.id = "re:" + href;
  });
  footnote.forEach((item) => {
    const id = item.id;
    let a = document.createElement("a");
    a.href = "#re:" + id;
    a.innerHTML = " ↩︎";
    item.querySelector("p").appendChild(a);
  });
}

window.onload = function () {
  const btn_toogle_theme = document.querySelector("#btn-toggle");
  const main_dom = document;
  btn_toogle_theme.onclick = toogle_theme;

  main_dom.addEventListener("scroll", () => {
    markToc();
  });
  addBackRef();
};

// Katex 公式渲染
function renderKatex() {
  renderMathInElement(document.body, {
    // customised options
    // • auto-render specific keys, e.g.:
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    // • rendering keys, e.g.:
    throwOnError: false,
  });
}

document.addEventListener("DOMContentLoaded", function () {
  apply_theme();
  renderKatex();
});
