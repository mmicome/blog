//-------------------检测对象中是否存在某个属性-----------------------//

//1.使用in关键字。 该方法可以判断对象的自有属性和继承来的属性是否存在。
var o={x:1};
"x" in o;            //true，自有属性存在
//2.使用对象的hasOwnProperty()方法。该方法只能判断自有属性是否存在，对于继承属性会返回false。
o.hasOwnProperty("x");    　　 //true，自有属性中有x
//3.用undefined判断 自有属性和继承属性均可判断。该方法存在一个问题，如果属性的值就是undefined的话，该方法不能返回想要的结果
o.x!==undefined;        //true
var o={x:undefined};
o.x!==undefined;        //false，属性存在，但值是undefined

//-------------------复制一个对象-----------------------//

//深复制
var clone = function(obj){
  var newObj = {}
  if(obj instanceof Array) {
    newObj=[];
  }
 for(var key in obj) {
   newObj[key] = typeof key == 'object'?clone(obj[key]):obj[key];
 }
}

//将对象序列化再解析回来，对象中如果有函数function则不能正确复制
var obj = {a:1,b:2}
var newObj = JSON.parse(JSON.stringify(obj));
newObj.a=3;

//针对数组对象的方法，用数组方法concat一个空数组
var a=[1,2,3];
var b=a;
var c=[].concat(a);
a.push(4);

//Object.assign()
var obj = { a: 1 };
var copy = Object.assign({}, obj);
