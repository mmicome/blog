## find: ‘/run/user/1000/gvfs’: Permission denied解决办法

linux使用命令 find / -name *** 查找文件的时候会遇到以下报错

    find: ‘/run/user/1000/gvfs’: Permission denied   

明明用的是root用户，为什么权限不足呢？官方说这是一个bug——bug#615848. 原因是FUSE文件系统和权限不配的问题，全局搜索时碰到它就会退出报错。
其实这个目录是空的，查不查都没关系。所以,以下解决方式比较简直暴

    umount /run/user/1000/gvfs

    rm -rf /run/user/1000/gvfs

现在，你再使用命令 `find / -name ***` 查找东西是不是就爽多了。

再给一条命令简直暴一下,一次删除所有目录的目标文件或文件夹：

`find / -name ***|xargs rm -rf`//***为你要删除的文件或文件夹
