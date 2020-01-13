# Linux下如何查看版本信息

    Linux下如何查看版本信息， 包括位数、版本信息以及CPU内核信息、CPU具体型号等等，整个CPU信息一目了然。

1. `# uname －a`   （Linux查看版本当前操作系统内核信息）

    Linux localhost.localdomain 2.4.20-8 #1 Thu Mar 13 17:54:28 EST 2003 i686 athlon i386 GNU/Linux

2. `# cat /proc/version` （Linux查看当前操作系统版本信息）
 
   Linux version 2.4.20-8 (bhcompile@porky.devel.redhat.com)(gcc version 3.2.2 20030222 (Red Hat Linux 3.2.2-5)) #1 Thu Mar 13 17:54:28 EST 2003
 
3. `# cat /etc/issue`  或`cat /etc/redhat-release`（Linux查看版本当前操作系统发行版信息）
 
    Red Hat Linux release 9 (Shrike)

4. `# cat /proc/cpuinfo` （Linux查看cpu相关信息，包括型号、主频、内核信息等）

5. `# getconf LONG_BIT`  （Linux查看版本说明当前CPU运行在32bit模式下， 但不代表CPU不支持64bit）
 
6. `# lsb_release -a`