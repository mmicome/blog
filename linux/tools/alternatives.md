# [cmd] alternatives

    alternatives是Linux下的一个功能强大的命令。仅仅能在root权限下运行。
    如系统中有几个命令功能十分相似，却又不能任意删除，那么能够用 alternatives 来指定一个全局的设置。

    alternatives经常使用于同一个系统中安装同一软件的多个版本号。比方为了开发须要，
    我须要安装JDK1.4.2，同一时候还须要JDK1.6.10，我怎么样才干忽略安装路径，依照我自己的意思，使用我想要的java版本号呢？

## usage

    alternatives --install <link> <name> <path> <priority>
    [--initscript <service>]
    [--slave <link> <name> <path>]*
    alternatives --remove <name> <path>
    alternatives --auto <name>
    alternatives --config <name>
    alternatives --display <name>
    alternatives --set <name> <path>
    attention: `install`表示安装`link`是符号链接`name`则是标识符`path`是运行文件的路径`priority`则表示优先级
    
## ep: jdk

1. 注册软件 update-alternatives工具中注册；

    `# update-alternatives --install /usr/bin/java java /opt/jdk1.8.0_91/bin/java 200`
    
    `# update-alternatives --install /usr/bin/java java /opt/jdk1.8.0_111/bin/java 300`

2. 查看已注册列表

    `# update-alternatives --display java`

3. 修改命令版本(注意--display开关使用时第一行信息)默认为自动版本，根据优先级，使用优先级高的。：

    `# java - auto/manual mode `

4. 交互式修改 (交互式会提示一所有可用的列表， 选择对应的索引确认)

    `# update-alternatives --config java`

## more ep

[linux软件版本管理命令update-alternatives使用详解](https://www.jb51.net/article/112372.htm)
