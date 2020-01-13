# 配置git hook，用于代码提交前的验证 precommit

使用一个插件：husky ，此插件可以帮助我们在提交代码前，进行代码风格的检查，如果不符合eslint规范，是提交不到远程仓库的。

## install

`$ npm i huskey -D`

## 接下来在package.json 下面加入 husky 的配置项

```json
"husky": {
    "hooks": {
      "pre-commit": "echo 'husky' && npm run lint"
    }
  },
```

## 配置package.json

```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint --ext .js --ext .jsx --ext .vue client/",
    "lint-fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/",
    "clean": "rm -rf dist",
    "build:client": "cross-env NODE_ENV=production webpack --config build/webpack.config.client.js",
    "build": "npm run clean && npm run build:client",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.client.js"
  }
  ```

## git hook实现代码自动部署

> 原理与流程

    git用户执行git push操作
    远程仓库发现有用户执行了push操作，就会执行一个脚本post-receive（钩子）
    在post-receive脚本中，将git仓库的代码拷贝到web站点目录下

> 创建git仓库

我们可以在自己的服务器上创建git仓库，有两种方式：

        git --bare init (裸仓库)
        git init

> 两者区别：

    普通git仓库的目录结构就和你的代码目录结构一致，只多了.git目录，.git目录中包含了git的一些配置等数据
    裸仓库只保存了一些配置信息等，肉眼是找不到我们所上传的代码的

建议使用裸仓库

> 执行钩子

git仓库和git裸仓库的钩子所在位置不同。

        git普通仓库钩子在.git/hooks/中
        git裸仓库钩子在hooks/
    
钩子要做的事就是将代码从仓库中拷贝到web目录，有两种方式：

        在web目录中，将git仓库的代码克隆过来:git clone xxxxx，需要部署代码的时候，执行git pull即可将代码同步过来了。
        将git仓库中的代码打包，然后解压到web目录下

> 实现：

### 第一种方式实现：在上述hooks目录中，创建post-receive文件，内容如下

```sh
#!/bin/sh
DEPLOY_PATH=/home/wwwroot/default/myproject/

unset  GIT_DIR #这条命令很重要
cd $DEPLOY_PATH
git reset --hard
git pull
chown www:www -R $DEPLOY_PATH
```

### 第二种方式实现：

```sh
#!/bin/sh

DEPLOY_PATH=/home/wwwroot/default/myproject/

git archive --format zip --output /path/to/file.zip master # 将 master 以zip格式打包到指定文件（裸仓库中执行）

mv /path/to/file.zip $DEPLOY_PATH #将打包好的剪切到web目录

unset GIT_DIR

cd $DEPLOY_PATH

unzip -o file.zip #解压覆盖

rm -rf file.zip #删除

chown www:www -R $DEPLOY_PATH
```

## 参考

[《自定义 Git - Git 钩子》](https://www.git-scm.com/book/zh/v2/自定义-Git-Git-钩子)

**使用npmhusky 安装， yarn 有可能失败， husky 不起作用**