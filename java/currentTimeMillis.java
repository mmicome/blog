//控制线程时间，刷新屏幕频率：
import java.util.*;

public class currentTimeMillisDemo() {
  time1 = System.currentTImeMillis();
  //程序代码
  time2 = System.currentTimeMillis();
  if(time1-time2<60) {
      try {
        thread.sleep(60-(time1-time2));
      } catch(Exception e) {
          //
      }
   }
}

//生成不重复的文件名：

public  class currentTimeMillisDemo() {
  String filename = null;
  simpleDateFormat fn = new simpleDateFormat("yyMMddHHmmssSSS");
  filename = fn.format(new Date(System.currentTimeMillis()));
  return filename;
}
