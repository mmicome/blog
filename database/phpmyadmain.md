## CONFIG

    首先找到phpmyadmin的配置文件config.sample.inc.php改为config.inc.php

    host配置由localhost改为127.0.0.1
    
    不要直接编辑libraries/config.default.php 

短语密码(blowfish_secret)的设置 `$cfg['blowfish_secret'] = '';`如果认证方法设置为cookie，就需要设置短语密码，
置于设置为什么密码，由您自己决定 ，但是不能留空，否则会在登录phpmyadmin时提示错误 
