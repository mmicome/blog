# 解决yarn install一直卡在Building fresh packages

Building fresh packages...

[-/5] ⠐ waiting...
[-/5] ⠐ waiting...
[3/5] ⠐ electron
[4/5] ⠈ phantomjs-prebuilt
[5/5] ⠈ electron-chromedriver

今天用yarn安装一直卡这样...

项目目录下创建.npmrc或.yarnrc（npm安装就建立.npmrc）文件,输入下面得内容搞定

        registry "https://registry.npm.taobao.org"
        sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
        phantomjs_cdnurl "http://cnpmjs.org/downloads"
        electron_mirror "https://npm.taobao.org/mirrors/electron/"
        sqlite3_binary_host_mirror "https://foxgis.oss-cn-shanghai.aliyuncs.com/"
        profiler_binary_host_mirror "https://npm.taobao.org/mirrors/node-inspector/"
        chromedriver_cdnurl "https://cdn.npm.taobao.org/dist/chromedriver"