## 配置局域网可通过ip访问app

```
//配置
vue.config.js

dev.host = '0.0.0.0'
```

**当配置登录验证时， 如果设置了ip禁止访问， 必须通过域名访问，则此ip访问失效**

## 解决方案
> 1
```
//A本地配置host ：
A.localhost.com Aip
```

```
//局域B配置host
A.localhost.com Aip
```
> 2
[host 临时配置工具](test)

> 3
[内网dns解析服务器](test)

- [myown](test)
- [third](https://github.com/hursing/dns-server)
