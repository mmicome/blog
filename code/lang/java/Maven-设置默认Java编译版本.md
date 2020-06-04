Maven-设置默认Java编译版本

有两种方式，一种针对项目，一种针对全局

针对项目，需要在pom.xml中添加如下配置：

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.0</version>
                <configuration>
                    <target>9</target>
                    <source>9</source>
                </configuration>
            </plugin>
        </plugins>
    </build>
    
针对全局，则需要在全局配置文件settings.xml（一般位于C;/Users/${用户名}/.m2/settings.xml）中添加：

  <profiles>
    <profile>
      <id>jdk1.8</id>
      <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
      </activation>
      <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>
    </profile>
  </profiles>

  <activeProfiles>
    <activeProfile>jdk1.8</activeProfile>
  </activeProfiles>
