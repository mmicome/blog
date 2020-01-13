# mysql

# 卸载旧版本

```sh
# apt-get remove mysql-*
# dpkg -l |grep ^rc|awk '{print $2}' |sudo xargs dpkg -P
```

```sh
# dpkg --get-selections | grep mysql
//该命令查看系统上所有mysql相关的软件包
# apt-get --purge remove mysql-server
//依次使用--purge remove删除软件包
```

```sh
//残留卸载
# sudo apt-get autoremove
# sudo apt-get autoclean
# sudo rm /etc/mysql/ -R
# sudo rm /var/lib/mysql/ -R
```

## 安装

```sh
# apt-get install mysql-client mysql-server
# apt-get update && apt-get upgrade
```

```
# wget http://dev.mysql.com/get/mysql-apt-config_0.8.9-1_all.deb

# sudo dpkg -i mysql-apt-config_0.8.9-1_all.deb 
//按回车后会弹出一个选择框，第一个选择框提示你是否现在下载最新mysql，选择ok就是表示下载最新的mysql，接下在的都点ok就是了。如果选择disabled的选项，会弹出一个对话框，让选择其他版本的数据库。我这边弹出了5.6和5.7的版本的数据库。我选择了5.7的，接下来点击ok就行了。

# sudo apt-get update
//可能报错：GPG error 解决错误之后再安装：
# sudo apt-get install mysql-server mysql-client
```

    1. 首先执行：
    apt-key list

    2. 发现 pub 1024D/5072E1F5 2003-02-03 [expired: 2019-02-17]过期，删除mysql 的repository GPG key，删除命令如下：
    sudo apt-key del 5072E1F5

    3. 再执行：
    sudo apt-get update

    4. 发现报错： GPG error: http://repo.mysql.com jessie InRelease: The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 8C718D3B5072E1F5

    5. 重新生成key,缺少什么生成什么:
    sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 8C718D3B5072E1F5
    生成成功信息：
    gpg: requesting key 5072E1F5 from hkp server keyserver.ubuntu.com
    gpg: key 5072E1F5: public key "MySQL Release Engineering <mysql-build@oss.oracle.com>" imported
    gpg: Total number processed: 1
    gpg:               imported: 1

    6. apt-key list  再看一下key已经生成没有过期：
    pub   1024D/5072E1F5 2003-02-03 [expires: 2022-02-16]
    uid                  MySQL Release Engineering <mysql-build@oss.oracle.com>

    7. sudo apt-get update 发现没有报错了。

    8. sudo apt-get install mysql-server mysql-client

## 二进制安装

1. 首先关闭linux的防火墙，执行命令

`chkconfig iptables off`

2. 下载myql 二进制包

3. 下载后的mysql文件

`mysql-5.6.40-linux-glibc2.12-i686.tar.gz`

4. 创建mysql用户组及用户

`groupadd mysql`

`useradd -r -g mysql mysql`

5. 进入到mysql目录，执行添加MySQL配置的操作

`cp support-files/my-medium.cnf /etc/my.cnf`
或：
`cp support-files/my-default.cnf /etc/my.cnf`

6. 编辑/etc/my.cnf文件；

```sh
 basedir = /usr/local/mysql
 datadir = /usr/local/mysql/data
 port = 3306
 socket = /tmp/mysql.sock
 character-set-server = utf8
 skip-name-resolve
 log-err = /usr/local/mysql/data/error.log
 pid-file = /usr/local/mysql/data/mysql.pid
 ```

7. 在mysql当前目录下设定目录的访问权限（注意后面的小点，表示当前目录）

    chown -R mysql .
    chgrp -R mysql .
    scripts/mysql_install_db --user=mysql
    chown -R root .
    chown -R mysql data

8. 初始化数据（在mysql/bin或者mysql/scripts下有个 mysql_install_db 可执行文件初始化数据库），进入mysql/bin或者mysql/scripts目录下，执行下面命令

`./mysql_install_db --verbose --user=root --defaults-file=/etc/my.cnf --datadir=/usr/local/mysql/data --basedir=/usr/local/mysql --pid-file=/usr/local/mysql/data/mysql.pid --tmpdir=/tmp`

9. 启动mysql，进入/usr/local/mysql/bin目录，执行下面命令

`./mysqld_safe --defaults-file=/etc/my.cnf --socket=/tmp/mysql.sock --user=root &`

10. 设置开机启动，新开启shell中断后，进入mysql目录，执行下面命令

```sh
cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
cp /usr/local/mysql/support-files/mysql.server /etc/rc.d/init.d/mysql
chmod 700 /etc/init.d/mysql
chkconfig --add mysqld
chkconfig --level 2345 mysqld on
chown mysql:mysql -R /usr/local/mysql/
reboot
service mysqld status
```

11. 添加远程访问权限

添加mysql命令:

	`ln  -s /usr/local/mysql/bin/mysql  /usr/bin`  （mysql的安装路径）

更改访问权限:

    登录mysql,执行下面命令
    mysql -uroot -p 
    密码为空直接回车,运行以下两条命令
    GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'duan' with grant option;
    Flush privileges;
    exit
    reboot
## 工具使用

## 问题解决

- 解决mysql出现ERROR 1045 (28000): Access denied for user 'root'@'localhost' 

    1、首先stop你的mysql服务：
    2、打开终端做如下操作，开启权限：
    $ cd /usr/local/mysql/bin
    $ sudo su 
    3、再输入如下命令：
    ./mysqld_safe --skip-grant-tables &

    4、利用command+N 再开启一个终端服务，进入mysql：
    mysql -u -root -p

    5、修改root用户密码：
    show databases; 
    use mysql  //mysql一创建就默认带一个叫mysql的数据库
    show tables;
    UPDATE user SET password=PASSWORD('YOUR_PASSWORD') WHERE user='root'

    TIP： mysql从5.7后，把password改为authentication_string

              update user set authentication_string=password(‘YOUR_PASSWORD’) where user=’root‘ 

    如果以上两句都没法修改，还有一个不需要考虑版本问题的语句：

    ALTER USER 'root'@'localhost' IDENTIFIED BY 'YOUR_PASSWORD';

    6、重新加载权限表，退出mysql：
    FLUSH PRIVILEGES;
    exit;

    7、启动MySQL服务：
    sudo /usr/local/MySQL/support-files/mysql.server start  //或　service mysql start

## 连接Mysql提示Can’t connect to local MySQL server through socket的解决方法

	这是由于当使用host参数为“localhost”连接Mysql服务时，会优先使用“sock文件”进行连接，而不是使用“IP:端口”进行连接，而mysql尝试使用“sock文件”进行连接时，却无法获取“sock文件”的位置。
 
要解决此错误，有两种解决方法：

	将连接参数“host”的值由“localhost”改成“127.0.0.1”；
	按下面方法，在“/etc/mysql.cnf”中指定“sock文件”位置。

一、查看mysql服务的socket文件位置：

　　mysql socket文件的位置是在/etc/my.cnf中设置的，cat /etc/my.cnf内容如下：
  
	[mysqld]
	datadir=/storage/aiezu.com/mysql
	socket=/storage/aiezu.com/mysql/mysql.sock
	user=mysql

　　其中socket等于的路径就是socket文件的位置，我们只要修改my.cnf文件,告诉mysql，mysqldump，mysqladmin等mysql服务的socket位置在哪里就可以了，文件中可以看出，我的socket文件位置为："/storage/aiezu.com/mysql/mysql.sock"。
　
二、修改my.cnf文件解决问题：

　　在/etc/my.cnf文件中添加如下内容，并重启mysqld服务，即可解决mysql、mysqldump、mysqladmin的“Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'”问题：
  
	[mysqld]
	datadir=/storage/aiezu.com/mysql
	socket=/storage/aiezu.com/mysql/mysql.sock

	[mysql]
	socket=/storage/aiezu.com/mysql/mysql.sock

	[client]
	socket=/storage/aiezu.com/mysql/mysql.sock

	[mysqldump]
	socket=/storage/aiezu.com/mysql/mysql.sock

	[mysqladmin]
	socket=/storage/aiezu.com/mysql/mysql.sock
 
三、php连接mysql服务提示"Can't connect to local MySQL server through socket..."的解决方法：

　　有时候mysql服务正常运行，用户名密码也完全正确，使用php的mysql_connect函数却连接不了mysql，调用php的mysql_error()函数提示“Can't connect to local MySQL server through socket '/var/lib/mysql/mysql.sock'”，这是我们需要修改/etc/php.ini文件。
  
　　在/etc/php.ini文件中"[MySQL]"项下找到"mysql.default_socket"，并设置其值指向正确的mysql服务socket文件即可，如：
[MySQL]

	...省略n行...
	mysql.default_socket = "/storage/aiezu.com/mysql/mysql.sock"
 
四、python连接mysql提示"Can't connect to local MySQL server through socket..."的解决方法：
　　在连接mysql数据库函数中指定socket文件，如下：
  
	#!/usr/bin/python
	from MySQLdb import connect
	conn = connect(db="pzy", user="root", host="localhost", unix_socket="/storage/aiezu.com/mysql/mysql.sock")
	cur = conn.cursor()
	count=cur.execute("show databases")
	print 'there has %s dbs' % count
	conn.commit()
	conn.close()
 
五、 php pdo连接mysql提示"Can't connect to local MySQL server through socket..."的解决方法:
　　同样在连接字符串添加mysql socket文件的位置即可，如下:
  
	<?php
	$dsn = "mysql:host=localhost;dbname=pzy;unix_socket=/storage/aiezu.com/mysql/mysql.sock";
	$db = new PDO($dsn, 'root', '');
	$rs = $db->query("SELECT * FROM qrtest");
	while($row = $rs->fetch()){
	    print_r($row);
	}
	?>
## ubuntu16.04系统下如何将apache2的默认php版本切换成5.6:(开启某个模块使用 a2enmod, 禁用某个模块使用 a2dismod)

	$ sudo a2dismod php7.0
	$ sudo a2enmod php5.6
	$ sudo service apache2 restart
	
	开启 mod_rewrite 模块使用如下命令a2enmod ：

如果有使用CDN，那么还需要开启 mod_headers 和 mod_expires：

	root@ubuntu:~# a2enmod mod_headers

	root@ubuntu:~# a2enmod mod_expires


## 常用数据库管理工具

- DBeaver 免费开源跨平台
- phpmyadmain  php
