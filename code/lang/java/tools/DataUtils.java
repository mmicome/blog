public class DateUtils {
  /**
  * @param formatStr 时间字符串格式化模版 "yyyy-MM-dd HH:mm:ss"
  * @param dataStr 时间字符串 "2019-03-13 13:54:00"
  * @return 时间戳
  */
  public static long dateToStamp(String formatStr, String dateStr) throws Exception {
    SimpleDataFormat simpleDataFormat = new SimpleDateFormat(formatStr);
    Date date = simpleDateFormat.parse(str);
    return data.getTime();
  }
}
