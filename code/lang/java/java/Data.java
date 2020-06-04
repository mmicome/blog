//三种方法来比较两个日期：
//使用 getTime() 方法获取两个日期（自1970年1月1日经历的毫秒数值），然后比较这两个值。
//使用方法 before()，after() 和 equals()。例如，一个月的12号比18号早，则 new Date(99, 2, 12).before(new Date (99, 2, 18)) 返回true。
//使用 compareTo() 方法，它是由 Comparable 接口定义的，Date 类实现了这个接口。

//使用 SimpleDateFormat 格式化日期
//SimpleDateFormat 是一个以语言环境敏感的方式来格式化和分析日期的类。SimpleDateFormat 允许你选择任何用户自定义日期时间格式来运行

import java.util.*;
import java.text.*;

public class DateDemo() {
  public static void main(String args[]) {
    Date dNow = new Date();
    SimpleDateFormat ft = new SimpleDateFormat("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
    
    System.out.println(ft.format(dNow));
  }
}

//解析字符串为时间
import java.util.*;
import java.text.*;

public class DateDemo() {
  public static void main(String args[]) {
    SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
    
    String input = args.length==0?"1818-11-11":args[0];
    
    System.out.println(input, "Parses as");
    
    Date t;
    
    try  {
      t=ft.parse(input);
      Syste.out.println(t);
    } catch (parseException e) {
      System.out.println("nparseable using:" + ft);
    }
  }
}

//Java 休眠(sleep)
import java.util.*;

public class SleepDemo() {
  public static void main(String args[]) {
    try {
      System.out.println(new Date());
      sleep(3000);
      System.out.println(new Date());
    } catch (Exception e) {
      System.out.println(e);
    }
  }
}


