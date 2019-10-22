import java.lang.reflect.Method;
import java.util.Map;

public class MyClass {

    public static void main(String[] args) {

        //同龄的人
        Student student0 = new Student();
        Map<String, String>  data;
        Object date;

        try{
            Class st = Student.class;
            Student sst = (Student)st.newInstance();  //静态成员不需要这一步
            Method method = st.getDeclaredMethod("getName", String.class);
            date = method.invoke(st,"33");
            data = (Map<String,String>)method.invoke(sst,"33");  //静态成员 使用  st
            System.out.println(data);
            System.out.println(date);
            System.out.println(method.invoke(sst, "33"));        //静态成员 使用  st
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }
}
//返回的Object 可以强制转换为 map, 
