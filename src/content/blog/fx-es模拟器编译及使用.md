---
title: "fx-ES 模拟器编译及使用"
tags: ["fx-ES","📦Archived"]
date: 2024-08-24T11:01:36+08:00
draft: false
---

> Casio fx-ES 系列计算器是卡西欧公司生产的一系列科学计算器，广泛应用于教育和专业领域。该系列以其高性能、易用性和多功能性著称，适合各种数学和科学计算需求。

## 源码编译

源代码来自: [user202729/fxesplus (github.com)](https://github.com/user202729/fxesplus)

Clone 源代码

```bash
git clone --recurse-submodules https://github.com/user202729/fxesplus --depth=1
```

```bash
cd CasioEmu/emulator/
```

安装依赖

```bash
pacman -S mingw-w64-ucrt-x86_64-gcc
pacman -S mingw-w64-ucrt-x86_64-meson
pacman -S mingw-w64-ucrt-x86_64-cmake
pacman -S mingw-w64-ucrt-x86_64-lua53
pacman -S mingw-w64-ucrt-x86_64-SDL2
pacman -S mingw-w64-ucrt-x86_64-SDL2_image
```

编译

```bash
meson build && cd build
meson configure -Dwerror=true -Dwarning_level=3 -Dcpp_std=c++11
ninja
./emulator ../../models/fx570esplus
```

提取dll

```bash
#!/bin/bash

# 目标目录
TARGET_DIR=extracted_dlls
# 创建目标目录
mkdir -p $TARGET_DIR
# 获取依赖于ucrtbase.dll的DLL文件列表
DEPENDENT_DLLS=$(ldd emulator.exe | grep "/ucrt64" | awk '{print $3}')
# 复制依赖的DLL文件到目标目录
for DLL in $DEPENDENT_DLLS; do
  cp $DLL $TARGET_DIR/
done
echo "提取的DLL文件存储在$TARGET_DIR目录中。"
```

## 使用

通过指定models目录，运行对应的模拟器

> `CasioEmu/models` 目录下不含`rom.bin`文件, 需要复制`fxesplus`目录下的rom文件到对应文件夹内。

```bash
.\emulator.exe model=.\models\fx991cnx
```

还可以指定运行时的脚本等属性

```bash
.\emulator.exe model=.\models\fx991cnx script=.\lua-emu-init.lua resizable=true width=340 height=716
```

写一个启动脚本

```bat
@echo off
REM 获取当前目录
set CURRENT_DIR=%cd%

REM 将dll目录添加到PATH环境变量中
set PATH=%CURRENT_DIR%\dlls;%PATH%

REM 启动emulator.exe
emulator.exe model=.\models\fx991cnx
```
