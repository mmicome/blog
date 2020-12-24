# Kali更新源 - 由于没有公钥，无法验证下列签名, 方法一，未验证

    wget -q -O - https://archive.kali.org/archive-key.asc | apt-key add
    sudo leafpad /etc/apt/sources.list
    sudo apt update && sudo apt upgrade

## root@maoser:~# sudo apt update && sudo apt install git vim -y  方法二，已验证

	命中:1 http://mirrors.aliyun.com/kali kali-rolling InRelease
	获取:2 http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel InRelease [21.3 kB]
	错误:2 http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel InRelease
	  由于没有公钥，无法验证下列签名： NO_PUBKEY 6DA746A05F00FA99
	正在读取软件包列表... 完成
	W: GPG 错误：http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel InRelease: 由于没有公钥，无法验证下列签名： NO_PUBKEY 6DA746A05F00FA99
	E: 仓库 “http://ppa.launchpad.net/hzwhuang/ss-qt5/ubuntu devel InRelease” 没有数字签名。
	N: 无法安全地用该源进行更新，所以默认禁用该源。
	N: 参见 apt-secure(8) 手册以了解仓库创建和用户配置方面的细节。

解决方法：使用一下命令导入公钥

	gpg --keyserver pgpkeys.mit.edu --recv-key 6DA746A05F00FA99

	gpg -a --export  6DA746A05F00FA99 | sudo apt-key add -

	sudo apt-get update && sudo apt upgrade

## 参考源

- 官方源

    deb https://http.kali.org/kali kali-rolling main non-free contrib
    deb-src https://http.kali.org/kali kali-rolling main non-free contrib

- 阿里云
    deb https://mirrors.aliyun.com/kali kali-rolling main non-free contrib 
    deb-src https://mirrors.aliyun.com/kali kali-rolling main non-free contrib 

- 清华大学 
    deb https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free 
    deb-src https://mirrors.tuna.tsinghua.edu.cn/kali kali-rolling main contrib non-free 


