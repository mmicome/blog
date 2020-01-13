# 快速使用 vscode 进行 Java 编程

vscode 的用户配置分3个级别，分别是默认配置、全局配置和工作区配置，优先级也依次递
增。对于团队项目，一些规范可以通过项目目录下建一个 .vscode/setting.json 文件进行配置,比
如：

        // tab长度 
        editor.tabSize': 2, 
        // 启用后，将在保存文件时剪裁尾随空格。
        'files.trimTrailingWhitespace': true,
        // 配置 glob 模式以排除文件和文件夹。
        'files.exclude': {
            '**/.git': true, 
            '**/.svn': true, 
            '**/.DS_Store': true, 
            '**/.idea': true 
        },

## 配置 Java 环境

先安装 Java 语言相关的插件 4 枚

        Language Support for Java(TM) by Red Hat
        Debugger for Java
        Java Test Runner
        Maven for Java

maven 是在Java环境下构建应用程序的软件（本地要先安装哦）。这时候还需要配置一下 java.home，
`'java.home': '/Library/Java/JavaVirtualMachines/jdk1.8.0_101.jdk/Contents/Home',`

按住 ctrl 键鼠标悬停在类上面会有类描述，点击即可进入类定义处，方法也是同样。

## 代码重构

很强大的一个地方就是我们有时候会修改字段、方法的名称。

找到所有的引用： Shift + F12

同时修改本文件中所有匹配的： Ctrl+F12

重命名：比如要修改一个方法名，可以选中后按 F2，输入新的名字，回车，会发现所有的文
件都修改了

跳转到下一个 Error 或 Warning：当有多个错误时可以按 F8 逐个跳转

查看 diff： 在 explorer 里选择文件右键 Set file to compare，然后需要对比的文件上右键选择
Compare with file_name_you_chose

## 运行 SpringBoot 项目

下载一个 SpringBoot 的示例工程
`git clone https://github.com/JavaExamples/spring-boot-helloworld.gitcode spring-boot-helloworld`

```js
        {
            version ': '
            0.2 .0 ', '
            configurations ': [ { '
            type ': '
            java ',
            'name': 'Debug (Launch)-Application', 'request': 'launch', 'cwd': '${workspaceFolder}', 'console':
            'internalConsole', 'stopOnEntry': false, 'mainClass': 'hello.Application', 'projectName': 'spring-boothelloworld', 'args': ''
        }, {
            'type': 'java',
            'name': 'Debug (Attach)',
            'request': 'attach',
            'hostName': 'localhost',
            'port': 0
        }]
        }
```

主要看 mainClass，只有第一次生成这个文件，确认后点击 调试 即可看到控制台日志

## 尝试 Lombok

 @Data 注解帮我自动生成（编译后生成）getter、setter、toString、equals、hashCode
这些方法

按照官方的文档我尝试了不在 maven 环境下是行不通的！

所以我们安装一个 `Lombok Annotations Support for VS Code` 就可以了。在 maven 工程中添加 lombok 依赖
`org.projectlombok lombok 1.16.20 provided`
