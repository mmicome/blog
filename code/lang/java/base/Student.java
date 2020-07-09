import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Student {

    private String age;

    private String id;

    private String name;

    public Student(String id, String name, String age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
    public Student() {

    }

    public static Map<String, String> getName(String age)
    {
        List<Student> Class = new ArrayList<>();
        Student student1 = new Student("1", "jack", "10");
        Student student2 = new Student("2", "babao", "13");
        Student student3 = new Student("3", "aao", "15");
        Student student4 = new Student("4", "ccc", "23");
        Student student5 = new Student("5", "bammo", "33");
        Student student6 = new Student("6", "bqqqo", "15");
        Student student7 = new Student("7", "yyymmo", "33");
        Student student8 = new Student("8", "bafg", "23");

        Class.add(student1);
        Class.add(student2);
        Class.add(student3);
        Class.add(student4);
        Class.add(student5);
        Class.add(student6);
        Class.add(student7);
        Class.add(student8);

        Map<String, String> students = new HashMap<>();
        for(Student student : Class)
        {
            if(age.equals(student.age))
            {
                students.put(student.id, student.name);
            }
        }
        return students;
    }
}
