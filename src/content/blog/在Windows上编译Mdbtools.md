---
title: 在 Windows 上编译 Mdbtools
tags: []
date: 2024-04-16T10:15:09+08:00
draft: true
---

## 前言

MDB Tools[^1]是一套开源的程序和库，它允许用户在 Unix-like 系统上读取、导出和操作 Microsoft Access 数据库文件（.mdb 或.accdb）。

MDB Tools 提供了一系列命令行工具，每个工具都有特定的用途，例如:

- `mdb-ver`: 显示数据库文件的版本信息。
- `mdb-schema`: 输出指定表的 DDL（数据定义语言）语句。
- `mdb-export`: 将数据表导出为 CSV 或 SQL 格式。
- `mdb-json`: 将数据表导出为 JSON 格式。
- `mdb-tables`: 列出数据库中的所有表名。
- `mdb-count`: 计算并显示表中的行数。
- `mdb-sql`: 提供一个简单的 SQL 命令行接口。
- `mdb-queries`: 列出数据库中存储的所有查询。

在 Linux 系统上安装 MDB Tools 很简单，各系统的软件包内基本都包含此软件，例如在 Debian 中直接使用`apt install mdbtools`即可安装。

但是官方并没有给出 Windows 版，因此需要自行编译，比较出名的一个编译版本是 [lsgunth/mdbtools-win](https://github.com/lsgunth/mdbtools-win)[^2]，这也是 QGIS SLYR[^3] 插件推荐安装的 Windows 版 MDB Tools。

> SLYR 提供了完整的 ArcMap/ArcGIS Pro 到 QGIS 的兼容性套件。这个套件旨在帮助用户将 ESRI 的地理信息系统产品中的项目和文档转换为 QGIS 可以识别和处理的格式，从而实现在这两个流行的 GIS 平台之间的无缝转换和互操作性。  
> SLYR 使用 MDB Tools 来读取 ArcMap Style 样式等文件（style 文件是以 Access 数据库格式保存的）

lsgunth 版的 Mdb Tools 目前在 Windows 上和 SLYR 插件不能正常交互，可能是由于一些奇怪的编码问题

## 编译 Mdb Tools

首先安装 MSYS2，使用官方推荐的 UCRT 环境

安装 gcc 等编译工具

```bash
pacman -Sy autoconf automake libtool base-devel mingw-w64-ucrt-x86_64-gcc mingw-w64-ucrt-x86_64-glib2
```

接下来生成`configure`脚本和`Makefile`文件

```bash
autoreconf -i -f
```

运行`configure`脚本

```bash
./configure
```

最后 make 编译

```bash
make
```

> 可能会有报错，见下一节

生成的 exe 文件路径为`./src/utils/*.exe`，独立运行的时候，需要复制依赖的 dll 文件到 exe 文件的同目录下
根据，需要的 dll 文件包括:

```bash
cp -p /mdbtools/src/util/.libs/*.exe /mdbtools-win/
cp -p /mdbtools/src/sql/.libs/*.dll /mdbtools-win/
cp -p /mdbtools/src/libmdb/.libs/*.dll /mdbtools-win/
cp -p /mingw32/bin/libgcc*.dll /mdbtools-win/
cp -p /mingw32/bin/libiconv*.dll /mdbtools-win/
cp -p /mingw32/bin/libreadline*.dll /mdbtools-win/
cp -p /mingw32/bin/libtermcap*.dll /mdbtools-win/
cp -p /mingw32/bin/libwinpthread*.dll /mdbtools-win/
```

## 一些修改

### 修改编译配置

使用最新的源码在 UCRT 环境下编译报错，可能是跟这次提交有关[Fix windows GH action (#399)](https://github.com/mdbtools/mdbtools/commit/0b96ecaff1c543feb39b7e855fa61e6651a01203)，官方的 Windows Build Action 能正常运行（但是 MSYS 环境，exe 文件似乎不能拿出来独立使用），因此进行了一些修改进行编译，还原了原来的设置。

```diff
diff --git a/configure.ac b/configure.ac
index 1383545..cb52cca 100644
--- a/configure.ac
+++ b/configure.ac
@@ -86,7 +86,7 @@ AC_SUBST(LFLAGS)
 CFLAGS="$CFLAGS -Wall -Werror"
 LOCALE_T=locale_t
 AS_CASE([$host],
-        [*mingw*], [LDFLAGS="$LDFLAGS -no-undefined" CFLAGS="$CFLAGS -D_spawnv=spawnv"], [])
+        [*mingw*], [LDFLAGS="$LDFLAGS -no-undefined" LOCALE_T=_locale_t], [])
 AC_SUBST(LOCALE_T)

 dnl See if iconv is present and wanted
```

### 修改提示符

Mdb Tools 使用了一个特殊的字符`…`[^4],在 Windows 上会显示乱码（也许仅仅是中文系统乱码？？），导致 SLYR 插件无法正常与 Mdb Tools 交互

![显示乱码](https://drive.liuxs.pro/api/raw/?path=/Images/blog/Pasted%20image%2020240416114428.png)

修改`src/libmdb/fakeglib.c`,但是编译不起作用，需要禁用`glib2`才能生效

```diff
-            "Usage:\n  %s [OPTION\xE2\x80\xA6] %s\n\n", appname, context->desc);
+            "Usage:\n  %s [OPTION...] %s\n\n", appname, context->desc);
```

```bash
./configure --disable-glib
```

禁用 glib 的情况下，只需要以下几个 dll

- `libmdb-3.dll`
- `libmdbsql-3.dll`
- `libgcc_s_seh-1.dll`
- `libwinpthread-1.dll`

> 可以使用 `ldd mdb-export.exe` 、`ldd libmdb-3.dll`查看程序依赖的 dll

这个符号似乎是由 Glib2 GOptionEntry 标准命令行引起的，有空再研究

相关资料:

- [GLib – 2.0: Commandline Option Parser (gtk.org)](https://docs.gtk.org/glib/goption.html)
- [GNOME / GLib · GitLab](https://gitlab.gnome.org/GNOME/glib)

## 编译结果

由于 MSYS2 系统是滚动发布的，软件包更新后可能会有新的问题导致编译失败，因此编译了一份最新（mdtools commit hash: `7e057e3`）修改的 MDB Tools: [点击下载](https://github.com/liuxsdev/mdbtools-win-build-action/releases/download/v1.0.0/mdbtools-build-win-ucrt64.zip)

修改后:
![显示正常](https://drive.liuxs.pro/api/raw/?path=/Images/blog/Pasted%20image%2020240416114459.png)

使用 SLYR 插件转换 Arcgis Style 文件无中文乱码:

![SLYR 插件转换正常](https://drive.liuxs.pro/api/raw/?path=/Images/blog/Pasted%20image%2020240416114723.png)

[^1]: [mdbtools/mdbtools: MDB Tools - Read Access databases on \*nix (github.com)](https://github.com/mdbtools/mdbtools)
[^2]: [lsgunth/mdbtools-win: MDBTools built for 32bit windows using MSYS2 (github.com)](https://github.com/lsgunth/mdbtools-win)
[^3]: [SLYR: the ESRI to QGIS Compatibility Suite – North Road (north-road.com)](https://north-road.com/slyr/)
[^4]: [Horizontal Ellipsis 水平省略号](https://unicode-table.com/cn/2026/)
