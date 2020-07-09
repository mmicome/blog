# unzip more file at the time

假设当前目录下有多个zip文件 data.zip invoices.zip pictures.zip visit.zip，

直接 unzip *.zip 等价于

        unzip data.zip invoices.zip pictures.zip

会报错

        Archive: data.zip
        caution: filename not matched: invoices.zip
        caution: filename not matched: pictures.zip
        caution: filename not matched: visit.zip

因为会认为后面三个zip文件是在第一个zip文件里面的,因此需要

        unzip '*.zip'
        //或者
        unzip "*.zip"
        //或者
        unzip \*.zip
        //或者
        for z in *.zip; do unzip $z; done
