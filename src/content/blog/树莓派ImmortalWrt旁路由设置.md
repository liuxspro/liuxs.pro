---
title: "树莓派 ImmortalWrt 旁路由设置"
tags: ["Openwrt", "Rpi4", "旁路由"]
date: 2023-07-29T23:24:09+08:00
draft: false
---

## 镜像下载

之前一直使用`SuLingGG`的 [OpenWrt-Rpi](https://github.com/SuLingGG/OpenWrt-Rpi) 项目的 Openwrt 镜像，但是现在已经停止更新了。于是使用推荐的 [immortalwrt](https://github.com/immortalwrt/immortalwrt) 项目的官方固件。

打开固件选择器 [ImmortalWrt Firmware Selector](https://firmware-selector.immortalwrt.org/) 选择机型 `Raspberry Pi 4B/400/4CM (64bit)`，下载固件。

ImmortalWrt 也提供了自定义预安装软件包和首次启动配置脚本.

![ImmortalWrt Firmware Selector](https://drive.liuxs.pro/api/raw/?path=/Images/blog/Snipaste_2023-07-30_10-10-06.png)

常用的几个软件包：

- `luci-theme-argon` argon 主题
- `luci-app-argon-config` argon 主题设置
- `openssh-sftp-server` sftp server, 用于 winscp 传文件
- `luci-app-ttyd` `luci-i18n-ttyd-zh-cn` 网页终端及其中文语言包

选择下载`💿FACTORY (EXT4)`镜像, 使用 [Raspberry Pi Imager](https://www.raspberrypi.com/software/) 或其他工具如 [balena Etcher](https://etcher.balena.io/) 写入镜像到 SD 卡。

## 旁路由设置

旁路由设置可参考`SuLingGG`写的 [自编译 OpenWrt 系列 - 旁路由设置指南](https://mlapp.cn/1008.html)，非常详尽。
由于镜像不同，有些地方的设置有细微差别。关键步骤整理如下。

- 插入写好镜像的 SD 卡，连接电源，启动树莓派，此时不需要插网线
- 连接树莓派发出的 wifi 信号 🛜`ImmortalWrt`，此时树莓派 的 IP 为 192.168.1.1，访问该地址进入 Openwrt 控制面板（用户名 root，无密码）
- 更改 Lan 口 IP: 可在网页终端（如果装了 luci-app-ttyd 的话）或者 ssh 登录到树莓派执行

  ```bash
  uci set network.lan.ipaddr=192.168.31.200
  uci commit network
  /etc/init.d/network restart
  ```

  IP 更改后，Wifi 连接应该会自动断开，再重新连接 Wifi，这时候要访问 192.168.31.200，也就是上一步设置的 IP 地址

- 更改 Lan 口参数: 在网络接口中设置网关和 DNS 为上级路由器 IP，并勾选忽略此接口/不在此接口提供 DHCP 服务
- 将树莓派连接到上级路由器上

如果无法访问网络，尝试在“网络 - 防火墙 - 自定义规则”中新增一行 iptables 规则并重启防火墙

```text
iptables -t nat -I POSTROUTING -j MASQUERADE
```

如果设备可以正常联网，但opkg update无法更新软件源，尝试在终端运行

```bash
opkg update --no-check-certificate
```

## 参考资料

[immortalwrt/immortalwrt: An opensource OpenWrt variant for mainland China users.](https://github.com/immortalwrt/immortalwrt)

[ImmortalWrt Downloads](https://downloads.immortalwrt.org/)

[自编译 OpenWrt 系列 - 旁路由设置指南](https://mlapp.cn/1008.html)
