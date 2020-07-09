//Java Scanner 类
//java.util.Scanner 是 Java5 的新特征，我们可以通过 Scanner 类来获取用户的输入。

//下面是创建 Scanner 对象的基本语法： Scanner s = new Scanner(System.in);

import java.util.Scanner; 

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        // 从键盘接收数据
 
        // next方式接收字符串
        System.out.println("next方式接收：");
        // 判断是否还有输入
        if (scan.hasNext()) {
            String str1 = scan.next();
            System.out.println("输入的数据为：" + str1);
        }
        scan.close();
    }
}

public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        // 从键盘接收数据
 
        // nextLine方式接收字符串
        System.out.println("nextLine方式接收：");
        // 判断是否还有输入
        if (scan.hasNextLine()) {
            String str2 = scan.nextLine();
            System.out.println("输入的数据为：" + str2);
        }
        scan.close();
    }
}
 
public class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
        // 从键盘接收数据
        int i = 0;
        float f = 0.0f;
        System.out.print("输入整数：");
        if (scan.hasNextInt()) {
            // 判断输入的是否是整数
            i = scan.nextInt();
            // 接收整数
            System.out.println("整数数据：" + i);
        } else {
            // 输入错误的信息
            System.out.println("输入的不是整数！");
        }
        System.out.print("输入小数：");
        if (scan.hasNextFloat()) {
            // 判断输入的是否是小数
            f = scan.nextFloat();
            // 接收小数
            System.out.println("小数数据：" + f);
        } else {
            // 输入错误的信息
            System.out.println("输入的不是小数！");
        }
        scan.close();
    }
}

class ScannerDemo {
    public static void main(String[] args) {
        Scanner scan = new Scanner(System.in);
 
        double sum = 0;
        int m = 0;
 
        while (scan.hasNextDouble()) {
            double x = scan.nextDouble();
            m = m + 1;
            sum = sum + x;
        }
 
        System.out.println(m + "个数的和为" + sum);
        System.out.println(m + "个数的平均值是" + (sum / m));
        scan.close();
    }
}

//输入的时候字符都是可见的，所以Scanner类不适合从控制台读取密码。从Java SE 6开始特别引入了Console类来实现这个目的。若要读取一个密码，可以采用下面这段代码：

Console cons = System.console();
String username = cons.readline("User name: ");
char[] passwd = cons.readPassword("Password: ");
//为了安全起见，返回的密码存放在一维字符数组中，而不是字符串中。在对密码进行处理之后，应该马上用一个填充值覆盖数组元素。


//通过StringTokenizer类可以分解输入的整行得到的带空格的字符串。默认情况下，StringTokenizer以空格，制表符，换行符和回车符作为分割依据。
import java.util.Scanner;
import java.util.StringTokenizer;

class Main {
    public static void main(String[] args) {
        Scanner scanner=new Scanner(System.in);
        System.out.println("输入数据：");
        StringTokenizer stringTokenizer=new StringTokenizer(scanner.nextLine());
        System.out.println("分隔后：");
        while(stringTokenizer.hasMoreTokens()){
            System.out.println(stringTokenizer.nextToken());
        }
    }
}

//Scanner 不仅能从输入流中读取，也能从文件中读取，除了构建 Scanner 对象的方法，其他和上文给出的完全相同，以下案例从一个名为 test.txt 的文件中读取整数。

// test.txt 文件内容：

// 1
// 2 
// 3
// 4
// 5
// Fileio.java 文件内容：

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class Fileio {
    public static void main(String[] args) throws FileNotFoundException {
        int[] arr=new int[10];
        int i=0;
        Scanner sc=new Scanner(new File("test.txt"));
        while(sc.hasNextInt()) {
            arr[i]=sc.nextInt();
            i++;
        }
        sc.close();
        System.out.printf("读取了 %d 个数\n",i);
        for(int j=0;j<i;j++) {
            System.out.println(arr[j]);
        }
    }
}