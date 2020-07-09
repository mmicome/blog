# String

- String 类有 11 种构造方法
- 注意:String 类是不可改变的，所以你一旦创建了 String 对象，那它的值就无法改变了
- 如果需要对字符串做很多修改，那么应该选择使用 StringBuffer & StringBuilder 类。
- String 类使用静态方法 format() 返回一个String 对象而不是 PrintStream 对象。
- String 类的静态方法 format() 能用来创建可复用的格式化字符串，而不仅仅是用于一次打印输出。

    ```java
    System.out.printf("浮点型变量的值为 " +
                    "%f, 整型变量的值为 " +
                    " %d, 字符串变量的值为 " +
                    "is %s", floatVar, intVar, stringVar);

    String fs;
    fs = String.format("浮点型变量的值为 " +
                    "%f, 整型变量的值为 " +
                    " %d, 字符串变量的值为 " +
                    " %s", floatVar, intVar, stringVar);
    ```

    ```java
    String s = "Google";
    System.out.println("s = " + s);
    s = "Runoob";
    System.out.println("s = " + s);
    //输出结果为：
    Google
    Runoob
    ```

**s 只是一个 String 对象的引用，并不是对象本身，当执行 s = "Runoob"; 创建了一个新的对象 "Runoob"，而原来的 "Google" 还存在于内存中。**

> length() 方法，length 属性和 size() 方法的区别:

1. length() 方法是针对字符串来说的，要求一个字符串的长度就要用到它的length()方法；
2. length 属性是针对 Java 中的数组来说的，要求数组的长度可以用其 length 属性；
3. Java 中的 size() 方法是针对泛型集合说的, 如果想看这个泛型有多少个元素, 就调用此方法来查看!

```java
public static void main(String[] args) {
    String []list={"ma","cao","yuan"};
    String a="macaoyuan";
    System.out.println(list.length);
    System.out.println(a.length());
    List array=new ArrayList();
    array.add(a);
    System.out.println(array.size());
}
```

> 关于 String 为啥是不可改变的

这里可以根据 jdk 的源码来分析。字符串实际上就是一个 char 数组，并且内部就是封装了一个 char 数组。并且这里 char 数组是被 final 修饰的:并且 String 中的所有的方法，都是对于 char 数组的改变，只要是对它的改变，方法内部都是返回一个新的 String 实例。

```java
public final class String
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
```

> java 中的字符串的加算法(对于字符串的加运算，当编译成 class 文件时，会自动编译为 StringBuffer 来进行字符串的连接操作。)

```java
String a = "a";
String b = "b";
String c = a + b;
//相当于：

String c = new StringBuffer().append(a).append(b).toString();
```

> 对于字符串常量池：当一个字符串是一个字面量时，它会被放到一个常量池中，等待复用。

```java
String a = "saff";
String b = "saff";
String c = new String("saff");
System.out.println(a.equal(b));  // true
System.out.println(a.equal(c));  // true
```

> 字符串优化

intern() 方法返回字符串对象的规范化表示形式。它遵循以下规则：对于任意两个字符串 s 和 t，当且仅当 s.equals(t) 为 true 时，s.intern() == t.intern() 才为 true。

”ab”.intern(), 这个方法会首先检查字符串池中是否有”ab”这个字符串，如果存在则返回这个字符串的引用，否则就将这个字符串添加到字符串池中，然会返回这个字符串的引用。

```java
String str1 = "a";
String str2 = "b";
String str3 = "ab";
String str4 = str1 + str2;
String str5 = new String("ab");
 
System.out.println(str5.equals(str3));
System.out.println(str5 == str3);
System.out.println(str5.intern() == str3);
System.out.println(str5.intern() == str4);
//true,false,true,false
```

- 第一、str5.equals(str3)这个结果为true，不用太多的解释，因为字符串的值的内容相同。
- 第二、str5 == str3对比的是引用的地址是否相同，由于str5采用new String方式定义的，所以地址引用一定不相等。所以结果为false。
- 第三、当str5调用intern的时候，会检查字符串池中是否含有该字符串。由于之前定义的str3已经进入字符串池中，所以会得到相同的引用。
- 第四，当str4 = str1 + str2后，str4的值也为”ab”，但是为什么这个结果会是false呢？先看下面代码：

```java
String a = new String("ab");
String b = new String("ab");
String c = "ab";
String d = "a" + "b";
String e = "b";
String f = "a" + e;

System.out.println(b.intern() == a);
System.out.println(b.intern() == c);
System.out.println(b.intern() == d);
System.out.println(b.intern() == f);
System.out.println(b.intern() == a.intern());
//false,true,true,false,true
```

- b.intern() == a和b.intern() == c可知，采用new 创建的字符串对象不进入字符串池
- b.intern() == d和b.intern() == f可知，字符串相加的时候，都是静态字符串的结果会添加到字符串池，如果其中含有变量（如f中的e）则不会进入字符串池中
- 字符串一旦进入字符串池中，就会先查找池中有无此对象。如果有此对象，则让对象引用指向此对象。如果无此对象，则先创建此对象，再让对象引用指向此对象。
- 在定义变量的时候赋值，如果赋值的是静态的字符串，就会执行进入字符串池的操作，如果池中含有该字符串，则返回引用。