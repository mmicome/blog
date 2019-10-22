//Calendar类是一个抽象类，在实际使用时实现特定的子类的对象，创建对象的过程是透明的，只需要使用getInstance方法创建即可。
//创建一个代表系统当前日期的Calendar对象
Calendar c = Calendar.getInstance();//默认是当前日期

//创建一个指定日期的Calendar对象
//创建一个代表2009年6月12日的Calendar对象
Calendar c1 = Calendar.getInstance();
c1.set(2009, 6 - 1, 12);


//GregorianCalendar类
//Calendar类实现了公历日历，GregorianCalendar是Calendar类的一个具体实现。
//Calendar 的getInstance（）方法返回一个默认用当前的语言环境和时区初始化的GregorianCalendar对象。
//GregorianCalendar定义了两个字段：AD和BC。这是代表公历定义的两个时代。
