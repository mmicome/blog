var s= document.getElementById("test"); 

del_ff(s);    //清理空格 

var chils= s.childNodes;  //得到s的全部子节点 

var par=s.parentNode;   //得到s的父节点 

var ns=s.nextSibling;   //获得s的下一个兄弟节点 

var ps=s.previousSibling;  //得到s的上一个兄弟节点 

var fc=s.firstChild;   //获得s的第一个子节点 

var lc=s.lastChild;   //获得s的最后一个子节点 
