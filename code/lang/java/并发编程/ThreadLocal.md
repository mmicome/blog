# 总结
ThreadLocal是用来维护本线程的变量的，并不能解决共享变量的并发问题。ThreadLocal是各线程将值存入该线程的map中，以ThreadLocal自身作为key，需要用时获得的是该线程之前存入的值。如果存入的是共享变量，那取出的也是共享变量，并发问题还是存在的。

ThreadLocal的主要用途是为了保持线程自身对象和避免参数传递，主要适用场景是按线程多实例（每个线程对应一个实例）的对象的访问，并且这个对象很多地方都要用到。

ThreadLocal是线程Thread中属性threadLocals的管理者。也就是说我们对于ThreadLocal的get, set，remove的操作结果都是针对当前线程Thread实例的threadLocals存，取，删除操作

## 使用场景

数据库连接

一般的Web应用划分为展现层、服务层和持久层三个层次，在不同的层中编写对应的逻辑，下层通过接口向上层开放功能调用。在一般情况下，从接收请求到返回响应所经过的所有程序调用都同属于一个线程

```java
import java.sql.Connection;  
import java.sql.SQLException;  
import java.sql.Statement;  
  
public class TestDaoNew {  
    // ①使用ThreadLocal保存Connection变量  
    private static ThreadLocal<Connection> connThreadLocal = new ThreadLocal<Connection>();  
  
    public static Connection getConnection() {  
        // ②如果connThreadLocal没有本线程对应的Connection创建一个新的Connection，  
        // 并将其保存到线程本地变量中。  
        if (connThreadLocal.get() == null) {  
            Connection conn = getConnection();  
            connThreadLocal.set(conn);  
            return conn;  
        } else {  
            return connThreadLocal.get();// ③直接返回线程本地变量  
        }  
    }  
  
    public void addTopic() throws SQLException {  
        // ④从ThreadLocal中获取线程对应的Connection  
        Statement stat = getConnection().createStatement();  
    }  
}  
```

将Connection的ThreadLocal直接放在DAO只能做到本DAO的多个方法共享Connection时不发生线程安全问题，但无法和其它DAO共用同一个Connection，要做到同一事务多DAO共享同一Connection，必须在一个共同的外部类使用ThreadLocal保存Connection。

```java
import java.sql.Connection;  
import java.sql.DriverManager;  
import java.sql.SQLException;  
  
public class ConnectionManager {  
  
    private static ThreadLocal<Connection> connectionHolder = new ThreadLocal<Connection>() {  
        @Override  
        protected Connection initialValue() {  
            Connection conn = null;  
            try {  
                conn = DriverManager.getConnection(  
                        "jdbc:mysql://localhost:3306/test", "username",  
                        "password");  
            } catch (SQLException e) {  
                e.printStackTrace();  
            }  
            return conn;  
        }  
    };  
  
    public static Connection getConnection() {  
        return connectionHolder.get();  
    }  
  
    public static void setConnection(Connection conn) {  
        connectionHolder.set(conn);  
    }  
}  
```

参数传递

```java
// A调用B调用C调用D， 轻重C没有源码

A(a,b,c,d){Context content = new Context();
context.setTrackerID(e)} -> B(b,c,d) -> C(c,d) -> D(c,d)

// 现在D 需要使用 TrackerID e， 改中间层无法实现, 需要

A(a,b,c,d) -> B(b,c,d) -> C(c,d) -> D(c,d){TrackerID...}

// 不考虑并发下， 将get,set 设置为静态方法
public class Context{
    private static String TrackerID;
    public static String getTrackerID(){
        ......
    }
    public static void setTrackerID(String id){
        ......
    }
}
//考虑并发下， 设置为静态方法，并使用ThreadLocal
public class Context{ 
    private static final ThreadLocal<String> mthreadLocal = new ThreadLocal<String>();
    public static String getTrackerID(){
        mthreadLocal.get();
    }
    public static void setTrackerID(String id){
        mthreadLocal.set(id);
    }
}
```

ThreadLocal不是用来解决对象共享访问问题的，而主要是提供了保持对象的方法和避免参数传递的方便的对象访问方式。归纳了两点：

1。每个线程中都有一个自己的ThreadLocalMap类对象，可以将线程自己的对象保持到其中，各管各的，线程可以正确的访问到自己的对象。

2。将一个共用的ThreadLocal静态实例作为key，将不同对象的引用保存到不同线程的ThreadLocalMap中，然后在线程执行的各处通过这个静态ThreadLocal实例的get()方法取得自己线程保存的那个对象，避免了将这个对象作为参数传递的麻烦。

动态设置数据源

https://blog.csdn.net/u012881904/article/details/77449710

https://www.jianshu.com/p/b158476dd33c

## 应用实例

Spring使用ThreadLocal解决线程安全问题

我们知道在一般情况下，只有无状态的Bean才可以在多线程环境下共享，在Spring中，绝大部分Bean都可以声明为singleton作用域。就是因为Spring对一些Bean（如RequestContextHolder、TransactionSynchronizationManager、LocaleContextHolder等）中非线程安全状态采用ThreadLocal进行处理，让它们也成为线程安全的状态，因为有状态的Bean就可以在多线程中共享了

Spring的事务管理器

Spring的事务管理器通过AOP切入业务代码，在进入业务代码前，会依据相应的事务管理器提取出相应的事务对象，假如事务管理器是DataSourceTransactionManager，就会从DataSource中获取一个连接对象，通过一定的包装后将其保存在ThreadLocal中。而且Spring也将DataSource进行了包装，重写了当中的getConnection()方法，或者说该方法的返回将由Spring来控制，这样Spring就能让线程内多次获取到的Connection对象是同一个。

为什么要放在ThreadLocal里面呢？由于Spring在AOP后并不能向应用程序传递參数。应用程序的每一个业务代码是事先定义好的，Spring并不会要求在业务代码的入口參数中必须编写Connection的入口參数。此时Spring选择了ThreadLocal，通过它保证连接对象始终在线程内部，不论什么时候都能拿到，此时Spring很清楚什么时候回收这个连接，也就是很清楚什么时候从ThreadLocal中删除这个元素

https://blog.csdn.net/zhouyong0/article/details/7761835

3.Hiberante的Session 工具类HibernateUtil

4.通过不同的线程对象设置Bean属性，保证各个线程Bean对象的独立性。

## ThreadLocal的坑

通过上面的分析。我们能够认识到ThreadLocal事实上是与线程绑定的一个变量，如此就会出现一个问题：假设没有将ThreadLocal内的变量删除（remove）或替换，它的生命周期将会与线程共存。

因此，ThreadLocal的一个非常大的“坑”就是当使用不当时，导致使用者不知道它的作用域范围。
大家可能觉得线程结束后ThreadLocal应该就回收了。假设线程真的注销了确实是这种，可是事实有可能并不是如此。比如在线程池中对线程管理都是採用线程复用的方法（Web容器通常也会採用线程池）。在线程池中线程非常难结束甚至于永远不会结束。这将意味着线程持续的时间将不可预測，甚至与JVM的生命周期一致。

那么对应的ThreadLocal变量的生命周期也将不可预測。
或许系统中定义少量几个ThreadLocal变量也无所谓。由于每次set数据时是用ThreadLocal本身作为Key的，同样的Key肯定会替换原来的数据。原来的数据就能够被释放了，理论上不会导致什么问题。但世事无绝对，假设ThreadLocal中直接或间接包装了集合类或复杂对象，每次在同一个ThreadLocal中取出对象后，再对内容做操作，那么内部的集合类和复杂对象所占用的空间可能会開始膨胀。

抛开代码本身的问题。举一个极端的样例。假设不想定义太多的ThreadLocal变量，就用一个HashMap来存放，这貌似没什么问题。由于ThreadLocal在程序的不论什么一个地方都能够用得到，在某些设计不当的代码中非常难知道这个HashMap写入的源头，在代码中为了保险起见。一般会先检查这个HashMap是否存在，若不存在，则创建一个HashMap写进去。若存在，通常也不会替换掉。由于代码编写者一般会“害怕”由于这样的替换会丢掉一些来自“其它地方写入HashMap的数据”。从而导致很多不可预见的问题。

在这种情况下。HashMap第一次放入ThreadLocal中或许就一直不会被释放，而这个HashMap中可能開始存放很多Key-Value信息，假设业务上存放的Key值在不断变化（比如，将业务的ID作为Key），那么这个HashMap就開始不断变长，并且非常可能在每一个线程中都有一个这种HashMap，逐渐地形成了间接的内存泄漏。以前有非常多人吃过这个亏，并且吃亏的时候发现这种代码可能不是在自己的业务系统中。而是出如今某些二方包、三方包中（开源并不保证没有问题）。

要处理这样的问题非常复杂，只是首先要保证自己编写的代码是没问题的。要保证没问题不是说我们不去用ThreadLocal。甚至不去学习它。由于它肯定有其应用价值。在使用时要明确ThreadLocal最难以捉摸的是“不知道哪里是源头”（一般是代码设计不当导致的），仅仅有知道了源头才干控制结束的部分。或者说我们从设计的角度要让ThreadLocal的set、remove有始有终，通常在外部调用的代码中使用finally来remove数据，仅仅要我们细致思考和抽象是能够达到这个目的的。有些是二方包、三方包的问题，对于这些问题我们须要学会的是找到问题的根源后解决，关于二方包、三方包的执行跟踪，可參看第3.7.9节介绍的BTrace工具。

补充：在不论什么异步程序中（包含异步I/O、非堵塞I/O），ThreadLocal的參数传递是不靠谱的，由于线程将请求发送后。就不再等待远程返回结果继续向下运行了，真正的返回结果得到后，处理的线程可能是还有一个。

内存泄漏：

使用ThreadLocal时会发生内存泄漏的前提条件：

- ①ThreadLocal引用被设置为null，且后面没有set，get,remove操作。
- ②线程一直运行，不停止。（线程池）
- ③触发了垃圾回收。（Minor GC或Full GC）

ThreadLocal时遵守以下两个小原则:

    ①ThreadLocal申明为private static final。
         Private与final 尽可能不让他人修改变更引用，
         Static 表示为类属性，只有在程序结束才会被回收。
    ②ThreadLocal使用后务必调用remove方法。
        最简单有效的方法是使用后将其移除。

## 备注

与Synchonized的对照:

ThreadLocal和Synchonized都用于解决多线程并发訪问。可是ThreadLocal与synchronized有本质的差别。synchronized是利用锁的机制，使变量或代码块在某一时该仅仅能被一个线程訪问。而ThreadLocal为每个线程都提供了变量的副本，使得每个线程在某一时间訪问到的并非同一个对象，这样就隔离了多个线程对数据的数据共享。而Synchronized却正好相反，它用于在多个线程间通信时可以获得数据共享。
 
Synchronized用于线程间的数据共享，而ThreadLocal则用于线程间的数据隔离。

## 参考(以上均为整理学习， 以下为大神出处)

[一个故事讲明白 ThreadLocal](https://mp.weixin.qq.com/s/aM03vvSpDpvwOdaJ8u3Zgw)

[java ThreadLocal(应用场景及使用方式及原理)](https://www.cnblogs.com/yxysuanfa/p/7125761.html)

[ThreadLocalMap](https://www.jianshu.com/p/3c5d7f09dfbd)

[关于ThreadLocal 内存泄漏](https://blog.csdn.net/zzg1229059735/article/details/82715741)
