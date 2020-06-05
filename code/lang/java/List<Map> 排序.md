## 通用list<Map>
```java
//关键代码
List<Map<String, Object>> list = new ArrayList();
...

Collections.sort(list, new Comparator<Map<String, Object>>() {
  public int compare(Map<String, Object> o1, Map<String, Object> o2) {
    String name1 =(String)o1.get("id");//name1是从你list里面拿出来的一个  
    String name2= (String)o2.get("id"); //name1是从你list里面拿出来的第二个name      
    return name1.compareTo(name2);   
})
```
## 特殊list<实体类>

```java
package core.java.collection.collections;
 
public class User implements Comparable<User>{
	
	private int score;
	
	private int age;
	
	public User(int score, int age){
		super();
		this.score = score;
		this.age = age;
	}
 
	public int getScore() {
		return score;
	}
 
	public void setScore(int score) {
		this.score = score;
	}
 
	public int getAge() {
		return age;
	}
 
	public void setAge(int age) {
		this.age = age;
	}
 
	@Override
	public int compareTo(User o) {
		int i = this.getAge() - o.getAge();//先按照年龄排序
		if(i == 0){
			return this.score - o.getScore();//如果年龄相等了再用分数进行排序
		}
		return i;
	}
	
}
 
public static void main(String[] args) {
		List<User> users = new ArrayList<User>();
		users.add(new User(78, 26));
		users.add(new User(67, 23));
		users.add(new User(34, 56));
		users.add(new User(55, 23));
		Collections.sort(users);
		for(User user : users){
			System.out.println(user.getScore() + "," + user.getAge());
		}
}
```
```java

package core.java.collection.collections;
 
public class Students {
	
	private int age;
	private int score;
	
	public Students(int age, int score){
		super();
		this.age = age;
		this.score = score;
	}
	
	public int getAge() {
		return age;
	}
	public void setAge(int age) {
		this.age = age;
	}
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
}
public static void main(String[] args) {
		List<Students> students = new ArrayList<Students>();
		students.add(new Students(23, 100));
		students.add(new Students(27, 98));
		students.add(new Students(29, 99));
		students.add(new Students(29, 98));
		students.add(new Students(22, 89));
		Collections.sort(students, new Comparator<Students>() {
 
			@Override
			public int compare(Students o1, Students o2) {
				int i = o1.getScore() - o2.getScore();
				if(i == 0){
					return o1.getAge() - o2.getAge();
				}
				return i;
			}
		});
		for(Students stu : students){
			System.out.println("score:" + stu.getScore() + ":age" + stu.getAge());
		}
}
```
