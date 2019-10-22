> java反射:object is not an instance of declaring class(对象不是声明类的实例)

    由于没有实力化可以有如下两种方法：
    
    1、反射方法定义成为static的，故被反射类就不需要实例化； 
    2、method.invoke(_class.newInstance(), args);
    
> [Java 集合转换(数组、List、Set、Map相互转换)](https://blog.csdn.net/top_code/article/details/10552827)

1. 当list或Set中元素类型单一时，可以使用带参数的toArray方法，参数为目标数组对象，如果目标数组长度小于List或Set的元素个数时，在转化时自动把目标数组长度调整到L，如果目标数组长度大于L，转化时将List或Set的元素放到目标数组的前L个位置。转化后需要进行强制类型转换，才能得到目标数组。array1 = (String[]) set.toArray(new String[0]); array2 = (String[]) set.toArray(new String[set.size()]);

2. 数组转化为List或Set时需要借助Arrays的asList方法，它将数组转化成一个List，可以用这个List构造Set。Set set = new HashSet(Arrays.asList(array));

> [数组array和集合list、set、map](https://www.cnblogs.com/liyiran/p/4607817.html)

> [Java正则表达式特殊字符及其处理](http://blog.51cto.com/7090376/1347721)

    public static boolean checkSpecialChar(String str) throws PatternSyntaxException {
        // 清除掉所有特殊字符
        String regEx =  ".*[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？\\\\]+.*";
        Pattern p = Pattern.compile(regEx);
        Matcher m = p.matcher(str);
        return m.matches();
    }
                             
     public   static   String filterString(String   str)   throws   PatternSyntaxException   {  
         String regEx= "[`~!@#$%^&*()+=|{}':;',\\[\\].<>/?~！@#￥%……&*（）——+|{}【】‘；：”“’。，、？\\\\]";
         Pattern   p   =   Pattern.compile(regEx);  
         Matcher   m   =   p.matcher(str);  
         return   m.replaceAll("_").trim();  
     }
     
> java数组拆分

    private <T> List<List<T>> spliceArrays(List<T> datas, int spliteSize)
    {
      if(data == null || spliteSize<1) {
        return null;
      }
      int totalSize = datas.size();
      int count = (totalSize % spliteSize == 0) ? (totalSize / spliteSize) : (totalSize / spliteSize + 1);
      List<List<T>> rows = new ArrayListt<>();
      for(int i = 0; i < count; i++) {
        List<T> cols = datas.subList(i*splitSize, (i==count-1)?totalSize:splitSize*(i+1);
        rows.add(cols);
      }
      return rows;
    }
    
> list 对于基础类型数据，直接存入栈中， 而对象则是引用存入List，类似的JSONObject 也是使用 new 对象实现 add()

> [java 反射](http://www.cnblogs.com/lzq198754/p/5780331.html)
