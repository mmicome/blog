- 安装：两种方式

        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
        wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

- cmd

        nvm ls-remote：列出所有可以安装的node版本号
        nvm install v10.4.0：安装指定版本号的node
        nvm use v10.3.0：切换node的版本，这个是全局的
        nvm current：当前node版本
        nvm ls：列出所有已经安装的node版本
