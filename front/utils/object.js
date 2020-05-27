/*
* freeze obj
*/

var freezeObj = function(obj) {
  Object.freeze(obj);
  Object.keys.foreach((key, i) => {
    if(typeof obj[key] == 'object') {
      freezeObj(obj[key]);
    }
  })
}

/*
* get top obj
*/

var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};

/*
* 现在有一个提案，在语言标准的层面，引入globalThis作为顶层对象，垫片库global-this模拟了这个提案，可以在所有环境拿到globalThis

Object.prototype下的属性为啥能在控制台直接访问， https://www.zhihu.com/question/346847436

the globalthisinherit fromObject.prototype Luckily, more modern JavaScript engines all seem to agree that the globalthismust haveObject.prototypein its prototype chain. 

也就是說，全局對象繼承自Object.prototype，Object.prototype在全局對象原型鏈的頂端，polyfill 之後， __T__ 就是全局對象自己。當然可以直接使用 __T__。

*/ 

(function (Object) {
  typeof globalThis !== 'object' && (
    this ?
      get() :
      (Object.defineProperty(Object.prototype, '_T_', {
        configurable: true,
        get: get
      }), _T_)
  );
  function get() {
    this.globalThis = this;
    delete Object.prototype._T_;
  }
}(Object));
