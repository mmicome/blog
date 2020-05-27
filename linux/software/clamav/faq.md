# 安装地址： https://www.clamav.net/downloads

## 安装教程： 

https://blog.csdn.net/yalecaltech/article/details/90575206
https://blog.51cto.com/11199460/2083697

> clamscan /home

 LibClamAV Error: cli_loaddb(): No supported database files found in /var/lib/clamav/ERROR: Can't open file or directory

解决办法：

sudo touch /var/lib/clamav/clamd-socket

sudo chown vscan:vscan /var/lib/clamav/clamd-socket   #vscan:vscan改成你的用户名和组名

sudo freshclam -v

扫描所有用户的主目录就使用 clamscan -r /home

扫描您计算机上的所有文件并且显示所有的文件的扫描结果，就使用 clamscan -r /

扫描您计算机上的所有文件并且显示有问题的文件的扫描结果，就使用 clamscan -r --bell -i /

> icome@icome:~$ sudo freshclam -v 

ERROR: /var/log/clamav/freshclam.log is locked by another process

先临时停止 clamav-freshclam 服务 sudo systemctl stop clamav-freshclam

更新完后再启动之 sudo systemctl start clamav-freshclam