# install

## 查看PHP 环境信息以及相关的模块
在/var/www/html目录下新建文件phpinfo.php并添加如下代码：

    <?php
    phpinfo();
    ?>

在浏览器地址栏输入IP/phpinfo.php访问,或在命令行：`php -r 'phpinfo();'`

## Ubuntu下找不到phpize可执行程序的解决办法:

  用C开发PHP扩展的时候如果用动态链接库的方式编译扩展模块，需要用到phpize,这个工具在使用`apt-get install php-devel`

## linux使用php动态安装模块mysqli.so

  正常过程: 
  1、安装mysql 
  2、安装php configure时带–with-mysql参数

不想重装使用phpize动态安装mysqli

- 切换到php安装目录
- 切换 ext/mysqli
- 运行`phpize`
- `./configure --with-php-config=/usr/local/php/bin/php-config -width-mysql=/usr/local/mysql/bin/mysql_config`
- `make`
- `make install`
- `vim php.ini`(具体哪个php.ini根据系统自行查) `extension=/mysqli.so 路径/`

## 查看 php.ini

    使用php内置的指令查找，使用如下命令，可以清楚的看出当前的php使用的配置文件：
    
    Configuration File (php.ini) Path: /etc/php/7.3/cli
    Loaded Configuration File:         /etc/php/7.3/cli/php.ini
    Scan for additional .ini files in: /etc/php/7.3/cli/conf.d
    Additional .ini files parsed:      /etc/php/7.3/cli/conf.d/10-mysqlnd.ini,
    /etc/php/7.3/cli/conf.d/10-opcache.ini,
    ...
