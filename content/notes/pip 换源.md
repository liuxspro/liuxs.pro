---
title: pip 换源
tags:
  - Python
  - Pip
date: 2023-06-22T10:22:35+08:00
draft: false
---

## 永久换源

### 阿里云

```bash
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```

```bash
pip config set install.trusted-host mirrors.aliyun.com
```

> 一般可以不设置，在遇到 ssl 报错时，可以将源地址改为 http 并设置 trusted-host

### 清华大学

```bash
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```

```bash
pip config set install.trusted-host tsinghua.edu.cn
```

## 临时换源

```bash
pip install requetst -i https://mirrors.aliyun.com/pypi/simple/
```
