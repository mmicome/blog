## synchronized的三种应用方式

Java中每一个对象都可以作为锁，这是synchronized实现同步的基础：

- 普通同步方法（实例方法），锁是当前实例对象 ，进入同步代码前要获得当前实例的锁
- 静态同步方法，锁是当前类的class对象 ，进入同步代码前要获得当前类对象的锁
- 同步方法块，锁是括号里面的对象，对给定对象加锁，进入同步代码库前要获得给定对象的锁。

为什么分布式环境下synchronized失效？如何解决这种情况？

synchronized 只是本地锁啊，锁的也只是当前jvm下的对象，在分布式场景下，要用分布式锁。
[分布式锁](https://www.cnblogs.com/krcys/p/9379836.html)

[秒杀系统分布式锁](https://blog.52itstyle.vip/archives/3325/）

synchronized究竟锁住的是什么呢,锁住的是一块内存,我们在内存中的某个位置设置一个值为0,当该值为0时,一个线程为了修改临界资源将其设置为1,然后读写操作,读写结束将其设置为0,其他线程可以再次将其改为1,进行读写,结束后再将其置为0......这块内存存储在每个对象的对象头中,我们称其为锁标志位(实际上所标志位不是简单的0和1,锁标志位分为四种状态:无锁,偏向锁,轻量级锁,和重量级锁,并发中还涉及锁升级等

## 一、synchronized作用于实例方法
```java
public class synchronizedTest implements Runnable {
    //共享资源
    static int i =0;
    /**
     * synchronized 修饰实例方法
     */
    public synchronized void increase(){
        i++;
    }
    @Override
    public void run(){
        for (int j =0 ; j<10000;j++){
            increase();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        synchronizedTest test = new synchronizedTest();
        Thread t1 = new Thread(test);
        Thread t2 = new Thread(test);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(i);
    }
}


```
当两个线程同时对一个对象的一个方法进行操作，只有一个线程能够抢到锁。因为一个对象只有一把锁，一个线程获取了该对象的锁之后，其他线程无法获取该对象的锁，就不能访问该对象的其他synchronized实例方法，但是可以访问非synchronized修饰的方法
## 二、synchronized作用于静态方法
```java
public class synchronizedTest implements Runnable {
    //共享资源
    static int i =0;
    /**
     * synchronized 修饰实例方法
     */
    public static synchronized void increase(){
        i++;
    }
    @Override
    public void run(){
        for (int j =0 ; j<10000;j++){
            increase();
        }
    }

    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(new synchronizedTest());
        Thread t2 = new Thread(new synchronizedTest());
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(i);
    }

```
两个线程实例化两个不同的对象，但是访问的方法是静态的，两个线程发生了互斥（即一个线程访问，另一个线程只能等着），因为静态方法是依附于类而不是对象的，当synchronized修饰静态方法时，锁是class对象。
## 三、synchronized作用于同步代码块
```java
 public class synchronizedTest implements Runnable {
    static synchronizedTest instance=new synchronizedTest();
    static int i=0;
    @Override
    public void run() {
        //省略其他耗时操作....
        //使用同步代码块对变量i进行同步操作,锁对象为instance
        synchronized(instance){
            for(int j=0;j<10000;j++){
                i++;
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        Thread t1=new Thread(instance);
        Thread t2=new Thread(instance);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(i);
    }
}

```
将synchronized作用于一个给定的实例对象instance，即当前实例对象就是锁对象，每次当线程进入synchronized包裹的代码块时就会要求当前线程持有instance实例对象锁，如果当前有其他线程正持有该对象锁，那么新到的线程就必须等待
**还可以使用this对象(代表当前实例)或者当前类的class对象作为锁**
```java
//this,当前实例对象锁
synchronized(this){
    for(int j=0;j<1000000;j++){
        i++;
    }
}

//class对象锁
synchronized(AccountingSync.class){
    for(int j=0;j<1000000;j++){
        i++;
    }
}

```
