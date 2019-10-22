提交代码到码云，Git报错如下：

`fatal: Authentication failed for 'https://gitee.com/......'`

很明显说明码云的认证失败，即用户名，密码输入错误。使用如下指令重置用户名密码：

`git config --system --unset credential.helper`

然后再次提交，重新输入用户名密码即可。
