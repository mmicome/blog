## Window to linux 上传文件

    pscp E:\javaWP\new.txt hollyfee@130.75.7.156:/home/hollyfee

## Linux to Window 下载文件

    pscp hollyfee@130.75.7.156:/home/hollyfee/new.txt E:\javaWP\new_copy.txt

## Linux to Linux

    scp /home/person/hww/abc.sql root@192.168.1.1:/home/person/hww  
    pscp /home/person/hww/abc.sql root@192.168.1.1:/home/person/hww  

**pscp和scp功能相同，但pscp同时支持windows下使用**


> 复制目录:

    $scp -r local_folder remote_username@remote_ip:remote_folder
    $scp -r local_folder remote_ip:remote_folder


> 从远程复制到本地的scp命令与上面的命令一样，只要将从本地复制到远程的命令后面2个参数互换顺序就行了。

> [download pscp：](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)

参考:https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/scp.html
