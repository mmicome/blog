round()
//它表示四舍五入，算法为 Math.floor(x+0.5)，即将原来的数字加上 0.5 后再向下取整，所以，Math.round(11.5) 的结果为12，Math.round(-11.5) 的结果为-11。

Integer a = 10;
Integer b = 10;
System.out.println(a == b);        // true
System.out.println(a.equals(b));   // true
Integer a = 1000;
Integer b = 1000;
System.out.println(a == b);        // false
System.out.println(a.equals(b));   // true
//Java 会对 -128~127 的整数进行缓存，并且注意 == 和 equals 的区别
