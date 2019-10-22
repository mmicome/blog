- 保留两位小数

```java
// 返回正确的数据格式
BigDecimal bg = new BigDecimal(f);
double f1 = bg.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
System.out.println(f1);
```
```java
//返回字符串格式， 使用方法解析为数字会报错
DecimalFormat df = new DecimalFormat("#.00");
System.out.println(df.format(f));
```
```java
//返回字符串
System.out.println(String.format("%.2f", f));
```
```java
// 输出位字符串， 解析数字会报错
NumberFormat nf = NumberFormat.getNumberInstance();
nf.setMaximumFractionDigits(2);
System.out.println(nf.format(f));
```
