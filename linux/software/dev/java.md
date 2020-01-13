# java 环境配置

## JDK二进制包安装

1. 新建目录 mkdir /home/icome/java
2. 解压JDK, tar -xzvf  jdk***.tar.gz
3. 两种方案： 单一环境/多环境
    - 单一环境 : 设置环境变量

        vim /etc/profile
        export JAVA_HOME=/home/icome/java/jdk-11.0.2
        export JRE_HOME=${JAVA_HOME}/jre
        export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib:$CLASSPATH
        export JAVA_PATH=${JAVA_HOME}/bin:${JRE_HOME}/bin
        export PATH=$PATH:${JAVA_PATH}:/usr/sbin

        source /etc/profile

    - 多环境： 使用工具 alternatives 配置

## maven 配置

## 框架配置

## 数据库配置

## 日志配置

## 开发工具配置