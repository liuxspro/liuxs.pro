---
title: Python 绘制风玫瑰图
tags: ["Python", "风玫瑰图"]
date: 2023-05-14T21:48:00+08:00
---

## 1. 前言

风玫瑰图（Wind Rose Plot）用来简单描述某一地区风向风速的分布，可分为**风向玫瑰图**和**风速玫瑰图**。在风向玫瑰图的极坐标系上，每一部分的长度表示该风向出现的频率，最长的部分表示该风向出现的频率最高。风玫瑰图通常分 16 个方向，也有的再细分为 32 个方向。[^1]

玫瑰图上所表示的风的吹向，是指从外部吹向地区中心的方向。一般来说，在风玫瑰图中，用粗实线表示全年风向频率，细实线表示按 12、1、2 月三个月统计的冬季风向频率，虚线表示按 6、7、8 月三个月统计的夏季风向频率。

## 2. 数据准备

绘制风玫瑰图需要某地区多年风向统计数据，我们根据中国地面气候资料日值数据集（V3.0）中某地区的风向风速数据。经过统计，得到该地区 1994 年 8 月~2015 年 2 月的风向数据。

风向一共分为 16 个方位，以北向为起始点，每隔 22.5° 确定一个风向，分别为北、东北偏北、东北、东北偏东、东、东南偏东、东南、东南偏南、南、西南偏南、西南、西南偏西、西、西北偏西、西北、西北偏北。根据风向数据，依次同统计各个风向出现的次数，统计出频率，具体见下表

| 编码 |   风向   | 风向字母 | 风向频率 |
| :--: | :------: | :------: | :------: |
|  1   |    北    |    N     |   6.48   |
|  2   | 东北偏北 |   NNE    |   3.50   |
|  3   |   东北   |    NE    |   5.89   |
|  4   | 东北偏东 |   ENE    |   1.54   |
|  5   |    东    |    E     |   7.69   |
|  6   | 东南偏东 |   ESE    |  10.95   |
|  7   |   东南   |    SE    |   8.77   |
|  8   | 东南偏南 |   SSE    |   8.25   |
|  9   |    南    |    S     |   7.04   |
|  10  | 西南偏南 |   SSW    |   7.35   |
|  11  |   西南   |    SW    |   6.98   |
|  12  | 西南偏西 |   WSW    |   3.15   |
|  13  |    西    |    W     |   1.86   |
|  14  | 西北偏西 |   WNW    |   2.04   |
|  15  |   西北   |    NW    |   8.07   |
|  16  | 西北偏北 |   NNW    |  10.43   |

## 3. 绘制风玫瑰图

下面使用 Python 的`matplotlib`包进行风玫瑰图的绘制。

首先，定义角度和风频数据。角度通过`np.deg2rad`转换为弧度

```python
# 定义角度和风频数据
deg_angles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 0]
data = [6.48, 3.50, 5.89, 1.54, 7.69, 10.95, 8.77, 8.25, 7.04, 7.35, 6.98, 3.15, 1.86, 2.04, 8.07, 10.43, 6.48]
angles = np.deg2rad(deg_angles)
labels = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']
```

然后创建 plot 使用极坐标(polar)。分别设置 X、Y 坐标轴和网格

```python
# Create the plot
fig = plt.figure(figsize=(8, 8))
ax = fig.add_subplot(111, polar=True)
# 设置X轴
ax.set_xticks(angles)
ax.set_xticklabels(labels)
# 设置Y轴
ax.set_yticks([4, 6, 8, 10, 12])
ax.set_yticklabels(['4%', '6%', '8%', '10%', '12%'])
# 设置网格
ax.xaxis.grid(color='gray', linestyle='-', linewidth=1)
ax.yaxis.grid(color='gray', linestyle='--', linewidth=1)
```

此时，创建的坐标系如图所示。显然，默认的极坐标系并不能满足我们的需求。需要设置 0 度位置为正北("N")[^2]，并设置角度增加方向为逆时针，设置完如图 2 所示。

```python
# 设置theta的零的位置为正北。
ax.set_theta_zero_location('N')
# 设置角度增加的方向为逆时针
ax.set_theta_direction(-1)
```

| ![图一](https://drive.liuxs.pro/api/raw/?path=/Images/blog/Snipaste_2023-05-21_22-47-03.png) | ![图二](https://drive.liuxs.pro/api/raw/?path=/Images/blog/Snipaste_2023-05-21_22-47-20.png) |
| :--------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
|                                           图 1                                           |                                           图 2                                           |

最后绘制风频玫瑰图

```python
# 风频玫瑰图
ax.plot(angles, data, '.-', linewidth=1, color="blue")
ax.fill(angles, data, alpha=0.3, color='blue')
```

<img src="https://drive.liuxs.pro/api/raw/?path=/Images/blog/image-2023-05-21_22-43-51.webp" style="zoom:80%;" />

## 4. 绘制 CAD 风格风玫瑰图

我们经常见到的一直风玫瑰图是黑白相间，并且带指北箭头的（可以称之为 CAD 风格玫瑰图？），可以使用`matplotlib`的路径`Path`去绘制风玫瑰的形状及箭头，最后隐藏掉坐标轴和网格。

> 关于`matplotlib`中`Path`的使用，可以参考此教程：[Path Tutorial — Matplotlib 3.7.1 documentation](https://matplotlib.org/stable/tutorials/advanced/path_tutorial.html)。  
> 这是翻译的版本：[路径教程 · Matplotlib 用户指南 @飞龙 (gitbooks.io)](https://wizardforcel.gitbooks.io/matplotlib-user-guide/content/3.8.html)

完整代码如下：

```python
import math

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import PathPatch, FancyArrowPatch
from matplotlib.path import Path


def create_polygons(angles: list, data: list):
    """创建风玫瑰黑白色填充图形"""
    black_vertices = []
    black_codes = []
    white_vertices = []
    white_codes = []
    for i in range(0, 16, 2):
        black_codes += [Path.MOVETO] + [Path.LINETO] * 2 + [Path.CLOSEPOLY]
        black_vertices += [(0, 0), (angles[i], data[i]), (angles[i + 1], data[i + 1]), (0, 0)]

    for i in range(1, 16, 2):
        white_codes += [Path.MOVETO] + [Path.LINETO] * 2 + [Path.CLOSEPOLY]
        white_vertices += [(0, 0), (angles[i], data[i]), (angles[i + 1], data[i + 1]), (0, 0)]

    black_path = Path(black_vertices, black_codes)
    white_path = Path(white_vertices, white_codes)
    black_pathpatch = PathPatch(black_path, facecolor='black')
    white_pathpatch = PathPatch(white_path, facecolor='white')
    return black_pathpatch, white_pathpatch


def create_axis(h_start, h_end, v_start, v_end):
    """创建坐标轴"""
    arrowstyle = '-|>'  # 箭头样式
    mutation_scale = 25  # 箭头大小
    linewidth = 2  # 箭头边框宽度
    edgecolor = 'black'  # 箭头边框颜色
    facecolor = 'black'  # 箭头填充颜色

    h_axis = FancyArrowPatch(
        h_start,  # 起点坐标
        h_end,  # 终点坐标
        arrowstyle=arrowstyle,
        mutation_scale=mutation_scale,
        linewidth=linewidth,
        edgecolor=edgecolor,
        facecolor=facecolor
    )

    v_axis = FancyArrowPatch(
        v_start,  # 起点坐标
        v_end,  # 终点坐标
        arrowstyle=arrowstyle,
        mutation_scale=mutation_scale,
        linewidth=linewidth,
        edgecolor=edgecolor,
        facecolor=facecolor
    )
    return h_axis, v_axis


# 定义角度和风频数据
deg_angles = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5, 0]
data = [6.48, 3.50, 5.89, 1.54, 7.69, 10.95, 8.77, 8.25, 7.04, 7.35, 6.98, 3.15, 1.86, 2.04, 8.07, 10.43, 6.48]
max_data = math.ceil(max(data))
angles = np.deg2rad(deg_angles)
labels = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N']

# Create the plot
fig = plt.figure(figsize=(8, 8))
ax1 = fig.add_subplot(121, polar=True)
ax2 = fig.add_subplot(122, polar=True)

# 设置theta的零的位置为正北。
# https://matplotlib.org/stable/api/projections/polar.html#matplotlib.projections.polar.PolarAxes.set_theta_zero_location
ax1.set_theta_zero_location('N')
# 设置角度增加的方向为逆时针
ax1.set_theta_direction(-1)

# 设置标题
# ax.set_title('Windrose', fontsize=14)
# 设置X轴
ax1.set_xticks(angles)
ax1.set_xticklabels(labels, fontsize=22, fontname="Times New Roman")
ax1.tick_params(axis='x', which='major', pad=18)
# 设置Y轴
ax1.set_yticks([4, 6, 8, 10, 12])
ax1.set_ylim(0, max_data + 2)
ax1.set_yticklabels(['4%', '6%', '8%', '10%', '12%'])
# 设置网格
ax1.xaxis.grid(color='gray', linestyle='-', linewidth=1)
ax1.yaxis.grid(color='gray', linestyle='--', linewidth=1)
# ax.grid(True)

black, white = create_polygons(angles, data)

h_axis, v_axis = create_axis(
    (angles[8], max_data + 1), (angles[0], max_data + 1),
    (angles[12], max_data + 1), (angles[4], max_data + 1)
)

ax1.plot(angles, data, '.-', linewidth=1, color="blue")
ax1.fill(angles, data, alpha=0.3, color='blue', )

# CAD风格风玫瑰图
ax2.set_theta_zero_location('N')
ax2.set_theta_direction(-1)

ax2.set_xticks(angles)
ax2.set_ylim(0, max_data + 2)
ax2.add_patch(black)
ax2.add_patch(white)
ax2.add_patch(h_axis)
ax2.add_patch(v_axis)
ax2.text(angles[0] + 0.1, max_data + 0.5, "N", ha="center", va="center", fontsize=22)
ax2.grid(False)
ax2.set_axis_off()

plt.show()

```

![](https://drive.liuxs.pro/api/raw/?path=/Images/blog/image-2023-05-21_22-17-17.webp)

[^1]: [风玫瑰图 - 维基百科，自由的百科全书 (wikipedia.org)](https://zh.wikipedia.org/wiki/%E9%A3%8E%E7%8E%AB%E7%91%B0%E5%9B%BE)
[^2]: [matplotlib.projections.polar — Matplotlib 3.7.1 documentation](https://matplotlib.org/stable/api/projections/polar.html#matplotlib.projections.polar.PolarAxes.set_theta_zero_location)
