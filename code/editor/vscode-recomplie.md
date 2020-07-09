# 一、 准备环境

- Node.js(>= 8.12.0, < 9.0.0)

- Python2.7

- Yarn(可以通过npm install yarn -g 命令安装，前提必须安装好nodejs)

- 为了使一些npm包能够工作（例如那些需要从源代码编译代码的包），需要安装build-essential包：

sudo apt-get install build-essential

- 关于Python(Ubuntu16.04默认自带Python.27，通过如下命令软链接即可)

sudo rm /usr/bin/python
sudo ln -s /usr/bin/python2.7 /usr/bin/python
python -V #显示2.7的版本号表示成功
 
- 关于Yarn

执行npm install yarn -g (全局安装yarn)

执行下面安装linux上所需环境依赖:

    sudo apt-get install libx11-dev libxkbfile-dev

    sudo apt-get install libsecret-1-dev

    sudo apt-get install fakeroot rpm