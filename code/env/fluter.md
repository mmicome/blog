## android stdio

- https://developer.android.google.cn/

- 运行程序，出现Failed to load module "canberra-gtk-module"错误的解决方案

`sudo apt-get install libcanberra-gtk-module`

- 给 android studio 添加快捷方式：

Android Studio 打开之后在 Tools -> 下找到 “Create Desktop Entry…” 点击后会添加到桌面快捷方式，找到该快捷方式右键可以选择“add to favorite” 添加到常用也就是会固定到左侧启动栏中了。

- Android Studio启动时联网，但google被墙

可更改Android Studio目录/bin/idea.properties,在文件中加入：`disable.android.first.run=true`启动后更改proxy,再注销该句。

- ubuntu20.04安装Android Studio踩坑

1.卸载搜狗输入法
截止现在（2020年10月7日），当搜狗输入法处于活动状态时，所有jetbrains全家桶都不能用。换用百度输入法解决问题

2.Failed to install the following Android SDK packages as some licences have not been accepted.
sdkmanager里用了java.se.ee里的东西导致的，java11已经将此模块废弃了。
解决方法：换用换用java8（java8还能再战100年 /滑稽）

3.终端里找不到sdkmanager和adb等命令
export PATH=HOME"/Android/Sdk/platform-tools"

4.adb找不到设备
Android Studio中找不到设备，使用adb devices查找，可以找到，但显示no permissions (user in plugdev group; are your udev rules wrong?);
手机的充电选项改成USB文件传输

- 运行flutter doctor出现Android license status unknown的解决方法

1.必须安装JDK8才行，更高的版本会出问题, 
2.安装Android SDK Tools 在Android Studio中启动SDK Manager,切换到SDK Tools，取消勾选Hide Obsolete Packages，之后在上方勾选Android SDK Tools (Obsolete)，最后点击Apply进行安装

3.更新android-licenses
在命令行执行flutter doctor --android-licenses，对所有选项输入y, 当出现All SDK package licenses accepted时成功结束

> 調試

- https://blog.csdn.net/knox_noe/article/details/84562405

- https://segmentfault.com/a/1190000022477747