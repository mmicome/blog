# linux 新环境配置

## 使用

1. 搜狗拼音安装（依赖fcitx）

## 开发

1. 翻墙
2. vscode 安装（为避免出问题，选择官方包下载安装）

https://www.zhihu.com/question/275664463/answer/406127910

3. git 安装

apt install git

https://blog.csdn.net/qq_36180893/article/details/82320421

4. java 配置

设置环境变量

vim /etc/profile

添加如下内容并保存：

#set java environment
JAVA_HOME=/usr/java/jdk1.8.0_191    
JRE_HOME=/usr/java/jdk1.8.0_191/jre     
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME JRE_HOME CLASS_PATH PATH

多版本方案

1. alternatives 

存在问题：http://blog.sina.com.cn/s/blog_72ef7bea0102x4bs.html

2. alias

vim ~/.bash_profile

export JAVA_9_HOME=/Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk/Contents/Home

export JAVA_8_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_152.jdk/Contents/Home      

export JAVA_6_HOME=/Library/Java/JavaVirtualMachines/1.6.0.jdk/Contents/Home

export JAVA_HOME=$JAVA_8_HOME

alias jdk9="export JAVA_HOME=$JAVA_9_HOME"

alias jdk8="export JAVA_HOME=$JAVA_8_HOME"

alias jdk6="export JAVA_HOME=$JAVA_6_HOME”

3. 基于jenv工具管理

git clone https://github.com/gcuisinier/jenv.git ~/.jenv
cd ~ 会发现多出一个文件夹.jenv，这个就是jenv的软件包
把jenv目录导入到环境变量 echo 'export PATH="$HOME/.jenv/bin:$PATH"' >> ~/.bash_profile

echo 'eval "$(jenv init -)"' >> ~/.bash_profile

source ~/.bash_profile

此时输入：jenv 会输出信息：jenv 0.4.3-18-g66bb5b1

以上已经安装了jdk，我们只需要把jdk加入到jenv即可：

jenv add /opt/jdk1.7.0_80
jenv add /opt/jdk1.8.0_144
看当前使用的java所在路径
jenv which java

查看可以设置的java版本
jenv versions

使用某个版本的JDK(全局)
jenv global 1.8

去掉某些没有的版本
jenv remove 1.8.0.144

4. 软连接

安装jdk
实验安装两个版本：

jdk-7u80-linux-x64.tar.gz
jdk-8u144-linux-x64.tar.gz
下载
wget http://download.oracle.com/otn-pub/java/jdk/8u144-b01/090f390dda5b47b9b721c7dfaa008135/jdk-8u144-linux-x64.tar.gz
wget http://download.oracle.com/otn/java/jdk/7u80-b15/jdk-7u80-linux-x64.tar.gz
安装
我把它安装到/opt中。

tar -zxvf jdk-7u80-linux-x64.tar.gz
在/opt 创建目录：sudo mkdir java
sudo mv jdk1.7.0_80 /opt/java
jdk8的方式也是一样。

创建软连接
sudo ln -s jdk1.7.0_80 jdk
默认使用jdk7
更改环境变量
echo $PATH 输出下，其实这个相当于window系统下的path

cd ~ 进入到家目录

sudo vi .bashrc

最后加入：export PATH=/opt/java/jdk/bin:$PATH

source .bashrc

此时直接可以输出：java -verson，为java7

直接在 /etc/profile修改即可：

export JAVA_HOME=/opt/java/
export PATH=$JAVA_HOME/bin:$PATH 

 

如果有天环境要做升级的话，比如要把jdk7升级到jdk8，我们只需要更改软连接地址：

把原来的jdk软连接删除掉
重新生成：sudo ln -s jdk1.8.0_144 jdk
此时已经升级完成
综述
以上版本管理的方式在linux中随处可见，比如python都是采用软连接的形式。