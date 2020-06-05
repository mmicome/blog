# 数组去重

> 方法一

```java
String[] array = {"a","b","c","c","d","e","e","e","a"};  
List<String> result = new ArrayList<>();  
boolean flag;  
for(int i=0;i<array.length;i++){  
    flag = false;  
    for(int j=0;j<result.size();j++){  
        if(array[i].equals(result.get(j))){  
            flag = true;  
            break;  
        }  
    }  
    if(!flag){  
        result.add(array[i]);  
    }  
}  
String[] arrayResult = (String[]) result.toArray(new String[result.size()]);  
System.out.println(Arrays.toString(arrayResult));
```

先遍历原数组，然后遍历结束集，通过每个数组的元素和结果集中的元素进行比对，若相同则break。若不相同，则存入结果集。 两层循环进行遍历得出最终结果。

> 方法二

```java
String[] array = {"a","b","c","c","d","e","e","e","a"};  
List<String> list = new ArrayList<>();  
list.add(array[0]);  
for(int i=1;i<array.length;i++){  
    if(list.toString().indexOf(array[i]) == -1){  
            list.add(array[i]);  
    }  
}  
String[] arrayResult = (String[]) list.toArray(new String[list.size()]);  
System.out.println(Arrays.toString(arrayResult));
```

通过使用indexOf方法进行判断结果集中是否存在了数组元素。

> 方法三

```java
String[] array = {"a","b","c","c","d","e","e","e","a"};  
List<String> list = new ArrayList<>();  
for(int i=0;i<array.length;i++){  
    for(int j=i+1;j<array.length;j++){  
        if(array[i] == array[j]){  
            j = ++i;  
        }  
    }  
    list.add(array[i]);  
}  
String[] arrayResult = (String[]) list.toArray(new String[list.size()]);  
System.out.println(Arrays.toString(arrayResult));
```

嵌套循环，进行比较获取满足条件结果集。

> 方法四

```java
String[] array = {"a","b","c","c","d","e","e","e","a"};  
Arrays.sort(array);  
List<String> list = new ArrayList<>();  
list.add(array[0]);  
for(int i=1;i<array.length;i++){  
    if(!array[i].equals(list.get(list.size()-1))){  
        list.add(array[i]);  
    }  
}  
<pre name="code" class="java"><span style="white-space:pre">        </span>String[] arrayResult = (String[]) list.toArray(new String[list.size()]);  
System.out.println(Arrays.toString(arrayResult));
```

先使用java提供的数组排序方法进行排序，然后进行一层for循环，进行相邻数据的比较即可获得最终结果集。

> 方法五

```java
String[] array = {"a","b","c","c","d","e","e","e","a"};  
Set<String> set = new HashSet<>();  
for(int i=0;i<array.length;i++){  
    set.add(array[i]);  
}  
String[] arrayResult = (String[]) set.toArray(new String[set.size()]);  
System.out.println(Arrays.toString(arrayResult));
```

感谢漂泊一剑客 的提议，加入set方法进行添加，虽然是无序排列，但是也更方便的解决了去重的问题。
