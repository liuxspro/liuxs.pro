---
title: "Termux 安装 Matplotlib"
tags: ["Termux", "Matplotlib", "Python"]
date: 2023-07-30T08:23:36+08:00
draft: false
---

> 2023 年 7 月 30 日  
> 当前`Python`版本`3.11.4`  
> Matplotlib 版本: `3.7.2`

两种安装方式，一种使用 pip 安装，另一种直接使用 apt 安装(termux 源里有 Matplotlib)，但这两种方式，目前都有一些问题。

## 1 使用 pip 安装 ❌

```bash
pip install matplotlib
```

### 安装 numpy

**好消息**: Termux 官方软件源中有 Numpy 最新版本 1.25.1

**坏消息**: Matplotlib 它不用，非要安装老版本 numpy==1.23.2

自 3.7.0 版本开始 Matplotlib 开始使用`oldest-supported-numpy`来构建[^1]，`oldest-supported-numpy`在给定的 Python 版本和平台上提供最旧的 NumPy 版本的作为构建时依赖项。

在 Python 3.11 下，numpy 版本被设为 1.23.2[^2]

也就是说，即使安装好了 Numpy，Matplotlib 也会去安装该平台上所支持的 Numpy 的最旧版本。

所以，还是避免不了去安装编译 numpy。

> [its-pointless](https://github.com/its-pointless/its-pointless.github.io/tree/master/files/24/dists/termux/extras/binary-aarch64) 仓库也不维护了,里面的 numpy 版本为 1.20.3

Numpy 的安装这里不论

假如成功解决了 Numpy 的依赖问题，后面还有个麻烦的包要编译，在下一节详细讲。

所以使用 pip 安装 Matplotlib 暂时失败

## 2 使用 apt 安装 ✔️

Termux 官方软件源中是有 Matplotlib 的，输入

```bash
❌ 先别使用这个命令安装
apt install matplotlib
```

在安装的最后阶段，会去安装一些 pip 包，其中`contourpy`安装报错

```bash
pip setup...
Writing to /data/data/com.termux/files/usr/etc/pip.conf
Setting up python-pillow (10.0.0) ...
Setting up matplotlib (3.7.2) ...
Installing dependencies through pip. This may take a while...
Collecting contourpy>=1.0.1
```

`contourpy` 1.1.0 版本需要`ninja`来构建，安装过程中会报一堆错误

详见 github 上关于这个问题的 issue: [pip install contourpy -U (and pip install ninja -U) fail · Issue #17474](https://github.com/termux/termux-packages/issues/17474)

Matplotlib 需求的 contourpy 最低为 1.0.1[^3]，而 1.0.1~1.0.7 版本都是可以正常使用 pip 安装的，安装完 contourpy 就可以顺利的安装 Matplotlib 了

```bash
pip install contourpy==1.0.7
```

另外，还有一个 pillow 库也需要提前通过 apt 安装

总结一下:

```bash
按照顺序安装
apt install python-numpy
apt install python-pillow
pip install contourpy==1.0.7
apt install matplotlib
```

[^1]: [github_stats_3.7.0.rst](https://github.com/matplotlib/matplotlib/blob/8c58e422129b00cf203eeb4d9a1c7bd2327a41fc/doc/users/prev_whats_new/github_stats_3.7.0.rst?plain=1#L472)

[^2]: [oldest-supported-numpy/setup.cfg](https://github.com/scipy/oldest-supported-numpy/blob/66810804478e971dd08c8ea3936bca2757a1fbcb/setup.cfg#L65C4-L65C87)

[^3]: [matplotlib/setup.py](https://github.com/matplotlib/matplotlib/blob/c36a03fbe6e64d8540891d705a74c328015b567e/setup.py#L331)
