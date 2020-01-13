> 链接wifi 出现 **System policy prevents modification of network setting for all users**

- `vim /usr/share/polkit-1/actions/org.freedesktop.NetworkManager.policy^C`

- 找到`<messsage>System policy prevents modification of network setting for all users</message>`

```xml
    <!--修改紧接上面发现文字下面标签的值-->
      <allow_inactive>no</allow_inactive>
      <allow_active>yes</allow_active>
```
