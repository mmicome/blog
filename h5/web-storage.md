H5之前的存储
cookies
Cookies缺陷：

http请求头 会显得臃肿 而且效率相对较低
4kb的大小 能存储的比较有限
主Domain污染 访问记录或者http请求的时候，会带着主域名的东西，这样随意去存取得话，会造成主域名的污染,造成一定的安全隐患.

UserData
只有IE支持(5-9支持)，XML文件。
存储大小：64k.

HTML5存储
目标：

解决4K大小问题
解决请求头常带存储信息的问题
解决关系型存储的问题
跨浏览器支持
HTML5存储优势：

存储空间大
接口丰富
数据相对安全
关系型
省流量
HTML5存储劣势

浏览器兼容
同源
脚本控制
更新策略

H5存储形式：

localstorage && sessionstorage：本地存储
application cache(离线储存)
indexedDB和Web SQL

localstorage && sessionstorage：本地存储
Web Storage实际上由两部分组成：sessionStorage与localStorage。
sessionStorage用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此sessionStorage不是一种持久化的本地存储，仅仅是会话级别的存储。
localStorage用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

API：localstorage && sessionstorage
存储形式：key → Value
过期：

localstorage是永久存储，永不过期的，除非是手动删除
sessionstorage是如果重新打开页面或者关闭浏览器，则sessionstorage就消失了
大小：每个域名5M
使用方法：
Web Storage中存储的是键值对，而且浏览器会以字符串方式存储。记住在必要的时候将他们转为其他格式。
sessionStorage与localStorage除了用途不同外，成员列表是一样的：
key = value: 存贮键值对
setItem(key, value): 存贮键值对
getItem(key): 取键值对
removeItem(key)：移除所有键值对
clear()：清空所有键值对
length：键值对的数目
setItem(key,value)方法中的value类型，理论上可以是任意类型，不过实际上浏览器会调用value的toString方法来获取其字符串值并存储到本地，因此如果是自定义的类型则需要自己定义有意义的toString方法。

h5本地存储：
只要是能序列化成字符串 或是转换成字符串的 就可以存储(数组、json数据、图片、脚本、样式文件)

图片存储的一个例子：

var src = '5k.jpg'
var set = function(key){
    var img = document.createElement("img");
    img.addEventListener("load",function(){
        var imgCanvas = document.createElement("canvas"),
            imgContext = imgCanvas.getContext("2d");
        imgCanvas.width = this.width;
        imgCanvas.height = this.height;
        //渲染
        imgContext.drawImage(this,0,0,this.width,this.height);
        var imgAsDataUrl = imgCanvas.toDataURL("image/png");
        //保存到本地
        try{
            localStorage.setItem(key,imgAsDataUrl);
        }catch(e){
            console.log("storage failed : " + e);
        }
    },false);
    img.src = src;
}
 
var get = function(key){
    var srcStr = localStorage.getItem(key);
    var imgObj = document.createElement("img");
    imgObj.src = srcStr;
    document.body.appendChild(imgObj);

使用注意事项：
1、使用前要判断浏览器是否支持（无痕模式不支持/一些奇葩浏览器不支持）；
2、写数据时候，需要异常处理，避免超出容量跑错（单个域名，容量5M）；
3、避免把敏感的信息存入localstorage；
4、key的唯一性（同key后边的会覆盖前边的）；

使用限制：
1、存储更新策略，过期控制:存储在本地的数据未加密而且永远不会过期，极易造成隐私泄漏。
2、子域名之间不能共享存储数据:浏览器会为每个域分配独立的存储空间，即脚本在域A中是无法访问到域B中的存储空间的，但是浏览器却不会检查脚本所在的域与当前域是否相同。即在域B中嵌入域A中的脚本依然可以访问域B中的数据。
3、超出存储大小之后如何存储(LRU,FIFO)
4、server端如何取到。localstorage只存客户端，server没办法访问到，如果server端有需求，只能更载post/get请求

使用场景：
1、利用本地数据，减少网络传输
2、弱网络环境下，高延迟，低带宽，尽量把数据本地化

Web SQL Database
Web SQL Database API 实际上未包含在 HTML 5 规范之中，它是一个独立的规范，它引入了一套使用 SQL 操作客户端数据库的 API。
它的核心方法有三个：openDatabase，transaction 和 executeSql。 这些 API 已经被广泛的实现在了不同的浏览器里，尤其是手机端浏览器。
W3C 官方在 2011 年 11 月声明已经不再维护 Web SQL Database 规范，

indexedDB
Indexed Database，也可简称为 IndexedDB（以前被称作 WebSimpleDB），同样是一个 Web 客户端存储结构化数据的规范.
indexedDB是一种能在浏览器中持久存储结构化数据的DB，并且为web应用提供了丰富的查询能力。
IndexedDB是为了替代目前已被废弃的Web SQL Database API而出现的。Indexed DB的实现是创建一套API，方便保存和读取javaScript对象，同时还支持查询及搜索。
var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;

indexedDB存储结构
indexedDB按域名分配独立空间，一个域名下可创建N个DB，一个DB有N个储存空间表，一个存储空间有N个对象数据。

IndexedDB最大的特色是：使用对象保存数据，而不是使用表来保存数据。一个IndexedDB数据库，就是一组位于相同命名空间下的对象的集合。

IndexedDB操作
数据库
使用IndexedDB的第一步是打开它，即把要打开的数据库名传给indexedDB.open().
调用indexedDB.open()会返回一个IDBRequest对象，在这个对象上可以添加onerror和onsuccess事件处理程序。

var request = indexedDB.open(dbName);

对象存储空间
var objectStore = thisDb.createObjectStore(tablename,{keyPath:"id",autoIncrement:true});
事务
在数据库对象上调用transaction()方法可以创建事务。任何时候，只要想读取或修改数据，都要通过事务来组织所有操作。
创建事务：
var transaction=db.transaction();
取得了事务的索引后，使用objectStore()方法并传入存储空间的名称，就可以访问特定的存储空间。

1
2
var transaction = db.transaction([tablename],"readwrite");
var objectStore = transaction.objectStore(tablename);
游标
使用事务可以直接通过已知的键检索单个对象。而在需要检索多个对象的情况下，则需要在事务内部创建游标。游标就是一指向结果集的指针。
在对象存储空间上调用openCursor()方法可以创建游标。openCursor()方法返回的是一个请求对象，因此必须为该对象指定onsuccess和onerror事件处理程序。
在onsuccess事件处理程序执行时，可以通过event.target.result取得存储空间中的下一个对象。

var objectStore = transaction.objectStore(tablename);
//使用游标遍历
objectStore.openCursor().onsuccess =function(event){
    var cursor = event.target.result;
    ...
};
objectStore.openCursor().onerror=function(event){
    console.dir(event);
}

键范围
通过游标查找数据的方式太有限了。键范围(key range)为使用游标增添了一些灵活性。
有四种定义键范围的方式，第一种是使用only()方法，传入你想要取得的对象的键。
var boundKeyRange = IDBKeyRange.only(curName);
这个范围可以保证只取得键为curName的对象。
索引
对于某些数据，可能需要为一个对象存储空间指定多个键。因此，可以考虑创建索引。
要创建索引，首先引用对象存储空间，然后调用createIndex()方法，如：

var objectStore = thisDb.createObjectStore(tablename,{keyPath:"id",autoIncrement:true});
objectStore.createIndex("name","name",{unique:false});


application cache(离线储存)
它可以让Web应用在离线的情况下继续使用，通过manifest文件指明需要缓存的资源。

检测是否在线：navigator.onLine

离线缓存的原理：

HTML5离线缓存使用：
1、在HTML页面文件 引入manifest.appcache

2、服务器端mime-type文件添加 text/cache-manifest 支持

更新缓存：修改appcache文件中的版本号即可；
取消使用缓存：去掉html标签中的manifest=“XXX.appcache”，再修改APPCache文件的名字

 //监控
window.onload = function(){
    window.applicationCache.onupdateready = function(e){
        console.log(window.applicationCache.status);
        if(window.applicationCache.status == window.applicationCache.UPDATEREADY){
            window.applicationCache.swapCache();
            if(confirm('版本更换，是否确认加载？要重新刷新两次')){
                window.location.reload();
            }
        }else{
            console.log('manifest did not change');
        }
    }
}

HTML5离线缓存特点：
优点：

完全离线
资源被缓存，加载更快
降低server负担
使用缺陷：

含有manifest属性的当前请求页无论如何都会被缓存
更新需要建立在manifest文件的更新，文件更新后是需要页面再次刷新的(需要2次刷新才能获取新资源)
更新是全局性的，无法单独更新某个文件(无法单点更新)
对于链接的参数变化是敏感的，任何一个参数的修改都会被(master)重新缓存(重复缓存含参页面)。index.html和index.html?renew=1会被认为是不同文件，分别缓存。

适用场景

单地址的页面
对实时性要求不高的业务
离线webapp

https://xifengxx.github.io/2016/07/10/HTML5%E5%AD%98%E5%82%A8%E5%8F%8A%E7%A6%BB%E7%BA%BF%E5%BA%94%E7%94%A8%E5%AE%9E%E6%88%98/
