---
title: "Termux 下安装 Mitmproxy"
tags: ["Termux", "Mitmproxy"]
date: 2023-06-22T10:22:35+08:00
draft: false
---

> 2023 年 6 月 22 日  
> 当前`Python`版本`3.11.4`  
> 当前`mitmproxy`版本`9.0.1`

使用`pip install mitmproxy`直接安装会卡在 cryptography 很久，把 cryptography 包先拎出来按安装好。

`cryptography`的安装编译需要有 C 编译器、Rust 编译器等，参考在 Debian/Ubuntu 上安装时需要的软件包[^1]。

```bash
sudo apt-get install build-essential libssl-dev libffi-dev python3-dev cargo pkg-config
```

在`termux`上安装，最简单的方法是`apt install python-cryptography`,官方的软件源中已经内置了这个包。但是官的软件源中的版本是最新版本 (41.0.1) ,而`mitmproxy 9.0.1`版本依赖的是 38.0.4 版本。因此，还是需要编译安装这个包 🤣。

安装好 rust 等依赖后，使用这个命令[^2]安装 cryptography 38.0.4 版本:

```bash
export RUSTFLAGS=" -C lto=no" && export CARGO_BUILD_TARGET="$(rustc -vV | sed -n 's|host: ||p')" && pip install cryptography==38.0.4
```

然后安装 mitmproxy

```bash
pip install mitmproxy
```

如果不想编译，可以试试我在 termux 上编译后导出的 whl 包,**依次下载**安装:

下载地址: <https://drive.liuxs.pro/zh-CN/Software/Termux/mitmproxy/>

```bash
pip install cryptography-38.0.4-cp311-cp311-linux_aarch64.whl
pip install mitmproxy_wireguard-0.1.23-cp37-abi3-linux_aarch64.whl
pip install ruamel.yaml.clib-0.2.7-cp311-cp311-linux_aarch64.whl

pip install mitmproxy
```

参考

[^1]: [Installation — Cryptography 42.0.0.dev1 documentation](https://cryptography.io/en/latest/installation/)

[^2]: [Cant install cryptography for python · Issue #9982 · termux/termux-packages (github.com)](https://github.com/termux/termux-packages/issues/9982#issuecomment-1369107679)
