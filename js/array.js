//关于数组操作方法的集合

//js中存在一个数组，如何判断一个元素是否存在于这个数组中呢，首先是通过循环的办法判断，代码如下：

var arr = ['a','s','d','f'];
console.info(isInArray(arr,'a'));//循环的方式

/**
 * 使用循环的方式判断一个元素是否存在于一个数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
            return true;
        }
    }
    return false;
}

/**
 * 使用indexOf判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray3(arr,value){
    if(arr.indexOf&&typeof(arr.indexOf)=='function'){
        var index = arr.indexOf(value);
        if(index >= 0){
            return true;
        }
    }
    return false;
}

/**
 * 使用jquery的inArray方法判断元素是否存在于数组中
 * @param {Object} arr 数组
 * @param {Object} value 元素值
 */
function isInArray2(arr,value){
    var index = $.inArray(value,arr);
    if(index >= 0){
        return true;
    }
    return false;
}

//数组深复制
//slice方法对数组进行备份 arrayObject.slice(start,end) 或者 concat() 方法
var arr = ['liuche', 'zhouyafu', 'huoqubing', 'weiqing'];
var arr2 = arr.slice(0);
var arr2 = arr.concat();
//多维数组，slice方法并不奏效 使用以下方法
var arr = [['liuche', 'zhouyafu', 'weiqing'], ['chengajiao', 'weizifu', 'liupiao']];
var arr2 = JSON.parse(JSON.stringify(arr));
arr2[0][3] = 'liguang';
alert(arr); // liuche,zhouyafu,weiqing,chengajiao,weizifu,liupiao
alert(arr2); // liuche,zhouyafu,weiqing,liguang,chengajiao,weizifu,liupiao
