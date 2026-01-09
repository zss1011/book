package book.manager.generate;

import com.baomidou.mybatisplus.generator.FastAutoGenerator;
import com.baomidou.mybatisplus.generator.config.OutputFile;
import com.baomidou.mybatisplus.generator.engine.FreemarkerTemplateEngine;

import java.sql.SQLException;
import java.util.Collections;

/**
 * @author: zss
 * @date: 2025/7/30
 * @desc:
 */
public class MybatisPlusAutoGenerator {
    
    /**
     * 数据库连接地址
     */
    public static final String JDBC_URL = "jdbc:mysql://localhost:3306/book_manager?characterEncoding=utf8&zeroDateTimeBehavior=convertToNull&useSSL=false&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=GMT%2B8";
    /**
     * 数据库用户账户
     */
    public static final String USERNAME = "root";
    /**
     * 数据库用户密码
     */
    public static final String PASSWORD = "Java213213";
    /**
     * 父包名
     */
    public static final String PARENT_PACKAGE = "book.manager.generate.code";
    /**
     * 代码生成目录
     */
    public static final String OUTPUT_DIR = "src/main/java/book/manager/generate/code";
    /**
     * mapper.xml生成目录
     */
    public static final String MAPPER_DIR = "src/main/java/book/manager/generate/code";
    
    /**
     * 先将代码生成在临时目录，再手动移植目标目录，防止误操作，覆盖已存在的
     */
    public static void main(String[] args) throws SQLException {
        // 初始化数据库脚本
        FastAutoGenerator.create(JDBC_URL, USERNAME, PASSWORD)
                .globalConfig(builder -> {
                    builder.author("mybatis-plus") // 设置作者
                            .enableSwagger() // 开启 swagger 模式
                            .fileOverride() // 覆盖已生成文件
                            .outputDir(OUTPUT_DIR); // 指定输出目录
                })
                .packageConfig(builder -> {
                    builder.parent(PARENT_PACKAGE) // 设置父包名
//                            .moduleName("moduleName") // 设置父包模块名
                            .pathInfo(Collections.singletonMap(OutputFile.mapperXml, MAPPER_DIR)); // 设置mapperXml生成路径
                })
                .strategyConfig(builder -> {
                    builder.addInclude("user_book_message") // 设置需要生成的表名
                            .addTablePrefix(""); // 设置过滤表前缀
                })
                .templateEngine(new FreemarkerTemplateEngine()) // 使用Freemarker引擎模板，默认的是Velocity引擎模板
                .execute();
    }
    
}
