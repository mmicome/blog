# Java 流(Stream)、文件(File)和IO

## 编码问题

java采用双字节进行编码 utf-16be,(因此java 一个字符可以存储一个汉字)

```java
String encode = "utf-8 | utf-16be | gbk | gb2312"
String s = "中文 english";
byte[] bt = s.getBytes[encode];
System.out.print(new String(bt, encode));
```

## **重要概念： 字节流与和字符流的不同**

- 操作代码上的不同
- 实际上字节流在操作时本身不会用到缓冲区（内存），是文件本身直接操作的，
- 字符流在操作时使用了缓冲区，通过缓冲区再操作文件

    缓冲区可以简单地理解为一段内存区域。可以简单地把缓冲区理解为一段特殊的内存。某些情况下，如果一个程序频繁地操作一个资源（如文件或数据库），则性能会很低，此时为了提升性能，就可以将一部分数据暂时读入到内存的一块区域之中，以后直接从此区域中读取数据即可，因为读取内存速度会比较快，这样可以提升程序的性能。在字符流的操作中，所有的字符都是在内存中形成的，在输出前会将所有的内容暂时保存在内存之中，所以使用了缓冲区暂存数据。如果想在不关闭时也可以将字符流的内容全部输出，则可以使用Writer类中的flush()方法完成。

> 使用字节流好还是字符流好？

    所有的文件在硬盘或在传输时都是以字节的方式进行的，包括图片等都是按字节的方式存储的，而字符是只有在内存中才会形成，所以在开发中，字节流使用较为广泛。

1. Java的字节流
   InputStream是所有字节输入流的祖先，而OutputStream是所有字节输出流的祖先。

    ```java
    package org.lxh.demo12.byteiodemo;
    import java.io.File;
    import java.io.FileOutputStream;
    import java.io.OutputStream;
    public class OutputStreamDemo05 {
      public static void main(String[] args) throws Exception {   // 异常抛出，  不处理
      // 第1步：使用File类找到一个文件
          File f = new File("d:" + File.separator + "test.txt"); // 声明File  对象
      // 第2步：通过子类实例化父类对象
          OutputStream out = null;
      // 准备好一个输出的对象
          out = new FileOutputStream(f);
      // 通过对象多态性进行实例化
      // 第3步：进行写操作
          String str = "Hello World!!!";
      // 准备一个字符串
          byte b[] = str.getBytes();
      // 字符串转byte数组
          out.write(b);
      // 将内容输出
      // 第4步：关闭输出流
          // out.close();
      // 此时没有关闭
        }
    }
    ```

    ```java
    //由于是二进制写入，可能存在乱码，用以下代码实例来解决乱码
    import java.io.*;
    
    public class fileStreamTest2{
      public static void main(String[] args) throws IOException {
        
        File f = new File("a.txt");
        FileOutputStream fop = new FileOutputStream(f);
        // 构建FileOutputStream对象,文件不存在会自动新建
        
        OutputStreamWriter writer = new OutputStreamWriter(fop, "UTF-8");
        // 构建OutputStreamWriter对象,参数可以指定编码,默认为操作系统默认编码,windows上是gbk
        
        writer.append("中文输入");
        // 写入到缓冲区
        
        writer.append("\r\n");
        //换行
        
        writer.append("English");
        // 刷新缓存冲,写入到文件,如果下面已经没有写入的内容了,直接close也会写入
        
        writer.close();
        //关闭写入流,同时会把缓冲区内容写入文件,所以上面的注释掉
        
        fop.close();
        // 关闭输出流,释放系统资源
    
        FileInputStream fip = new FileInputStream(f);
        // 构建FileInputStream对象
        
        InputStreamReader reader = new InputStreamReader(fip, "UTF-8");
        // 构建InputStreamReader对象,编码与写入相同
    
        StringBuffer sb = new StringBuffer();
        while (reader.ready()) {
          sb.append((char) reader.read());
          // 转成char加到StringBuffer对象中
        }
        System.out.println(sb.toString());
        reader.close();
        // 关闭读取流
        
        fip.close();
        // 关闭输入流,释放系统资源
    
      }
    }
    ```

2. Java的字符流
  Reader是所有读取字符串输入流的祖先，而writer是所有输出字符串的祖先。

  ```java
  package org.lxh.demo12.chariodemo;
  import java.io.File;
  import java.io.FileWriter;
  import java.io.Writer;
  public class WriterDemo03 {
      public static void main(String[] args) throws Exception { // 异常抛出，  不处理    
          // 第1步：使用File类找到一个文件    
          File f = new File("d:" + File.separator + "test.txt");// 声明File 对象    
          // 第2步：通过子类实例化父类对象    
          Writer out = null;                 
  // 准备好一个输出的对象    
          out = new FileWriter(f);            
  // 通过对象多态性进行实例化    
          // 第3步：进行写操作    
          String str = "Hello World!!!";      
  // 准备一个字符串    
          out.write(str);                    
  // 将内容输出    
          // 第4步：关闭输出流    
          // out.close();                   
  // 此时没有关闭    
      }    
  }   
  ```

    字节流是最基本的，所有的InputStream和OutputStream的子类都是,主要用在处理二进制数据，它是按字节来处理的，但实际中很多的数据是文本，又提出了字符流的概念，它是按虚拟机的Encode来处理，也就是要进行字符集的转化。

    这两个之间通过 InputStreamReader,OutputStreamWriter来关联，实际上是通过byte[]和String来关联。

    在实际开发中出现的汉字问题实际上都是在字符流和字节流之间转化不统一而造成的。

在从字节流转化为字符流时，实际上就是byte[]转化为String时，有一个关键的参数字符集编码，通常我们都省略了，那系统就用操作系统的lang,

    public String(byte bytes[], String charsetName)

而在字符流转化为字节流时，实际上是String转化为byte[]时，也是一样的道理
    byte[]    String.getBytes(String charsetName)

至于java.io中还出现了许多其他的流，按主要是为了提高性能和使用方便，如BufferedInputStream,PipedInputStream等

> Java 的控制台输入由 System.in 完成。(JDK 5 后的版本我们也可以使用 Java Scanner 类来获取控制台的输入。)

    ```java
    import java.io.*;

    //从控制台不断读取字符直到用户输入 "q"。
    public class BufferRead() {
      public static void main(String args[]) throws IOException
      {
        char c;
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        do {
          c = (char)br.read();
          System.out.println(c);
        } while(c != 'q');
      }
    }


    //从控制台读取字符串
    public class BufferReadLine() {
      public static void main(String args[]) throws IOException
      {
        String str;
        BufferedReader brl = new BufferedReader(new InputStreamReader(System.in));

        do {
          str = (String)brl.readLine();
          System.out.println(str);
        } while (!str.equals("end"));
      }
    }
    ```
> 读写文件
![输入流和输出流的类层次图 from 菜鸟教程](http:www.runoob.com/wp-content/uploads/2013/12/iostream2xx.png)

> 控制台输出

控制台的输出由 print( ) 和 println() 完成。这些方法都由类 PrintStream 定义，System.out 是该类对象的一个引用。PrintStream 继承了 OutputStream类

> FileOutputStream ,FileInputStream

该类用来创建一个文件并向文件中写数据。如果该流在打开文件进行输出前，目标文件不存在，那么该流会创建该文件。

使用字符串类型的文件名来创建一个输出流对象：

`OutputStream f = new FileOutputStream("C:/java/hello")`

也可以使用一个文件对象来创建一个输出流来写文件。我们首先得使用File()方法来创建一个文件对象：

`File f = new File("C:/java/hello");`
`OutputStream f = new FileOutputStream(f);`

## 文件

- File Class(类)
  以**抽象的方式代表文件名和目录路径名**。该类主要用于文件和目录的创建、文件的查找和文件的删除等

- FileReader Class(类)，FileWriter Class(类)
  **FileReader类从InputStreamReader类继承而来**。该类按字符读取流中数据

```java
import java.io.*;
public class FileRead{
   public static void main(String args[])throws IOException{
      File file = new File("Hello1.txt");
      // 创建文件
      file.createNewFile();
      // creates a FileWriter Object
      FileWriter writer = new FileWriter(file); 
      // 向文件写入内容
      writer.write("This\n is\n an\n example\n");
      writer.flush();
      writer.close();
      // 创建 FileReader 对象
      FileReader fr = new FileReader(file); 
      char [] a = new char[50];
      fr.read(a); // 读取数组中的内容
      for(char c : a)
          System.out.print(c); // 一个一个打印字符
      fr.close();
   }
}
```

```java
//创建目录
import java.io.File;

public class CreateDir {
  public static void main(String args[]) {
    String dirname = "/tmp/user/java/bin";
    File d = new File(dirname);
    // 现在创建目录
    d.mkdirs();
  }
}
```

```java
//读取文件
import java.io.File;

public class DirList {
  public static void main(String args[]) {
    String dirname = "/tmp";
    File f1 = new File(dirname);
    if (f1.isDirectory()) {
      System.out.println( "目录 " + dirname);
      String s[] = f1.list();
      for (int i=0; i < s.length; i++) {
        File f = new File(dirname + "/" + s[i]);
        if (f.isDirectory()) {
          System.out.println(s[i] + " 是一个目录");
        } else {
          System.out.println(s[i] + " 是一个文件");
        }
      }
    } else {
      System.out.println(dirname + " 不是一个目录");
    }
  }
}
```

```java
//删除目录或文件
import java.io.FIle;

public class DeleteFileDemo() {
  public static void main(String args[]) {
    File folder = new File("/temp/java");
    deleteFolder(folder);
  }

  public static void deleteFolder(File folder) {
    File[] files = folder.listFiles();
    if(files != null) {
      for(File f: files) {
        if(f.isDirectory()) {
          deleteFolder(f);
        } else {
          f.delete();
        }
      }
    }
    files.delete();
  }
}
```

注意： **Java 在 UNIX 和 Windows 自动按约定分辨文件路径分隔符。如果你在 Windows 版本的 Java 中使用分隔符 (/) ，路径依然能够被正确解析。**

> RandomAcceFil0e 多线程下载，文件拼接等

read(),write()方法一次只能读写一个字节

```java
RandomAccessFile raf = new RandomAccessFile(file, "rw");
raf.write("a");

int i = 0x7fffffff;
raf.writeInt(i);
//底层实现
// raf.write(i>>>24);
// raf.write(i>>>16);
// raf.write(i>>>8);
// raf.write(i);

String s="中";
byte[] gbk = s.getBytes("gbk");
raf.write(gbk);

raf.seek(0);
byte[] buf = new byte[(int)raf.length()];
raf.read(buf);
System.out.println(Arrays.toString(buf));
for(byte b : buf) {
  System.out.println(Integer.toHexString(b & xff) + " ");
}
```

> ByteArrayInputStream 和 ByteArrayOutputStream的使用：

字节数组输入流在内存中创建一个字节数组缓冲区，从输入流读取的数据保存在该字节数组缓冲区中。创建字节数组输入流对象有以下几种方式。

> DataInputStream类

数据输入流允许应用程序以与机器无关方式从底层输入流中读取基本 Java 数据类型。

> BufferedInputStream

提供缓冲区，提高IO性能

- FIleOutputStream ---> write() 逐字节操作
- DataOutputStream ---> writeXxx() 封装 write()，更快
- BUfferedOutputStream ---> write() 更方便