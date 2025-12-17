package book.manager;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * @author: zss
 * @date: 2025/7/30
 * @desc:ddddda
 */
@Slf4j
@EnableAspectJAutoProxy
@EnableScheduling
@MapperScan({"book.manager.dao.mapper"})
@ComponentScan({"book"})
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) {
        long time = System.currentTimeMillis();
        SpringApplication.run(MainApplication.class, args);
        log.info("======================== MainApplication:启动成功,耗时:{}秒 ========================", (System.currentTimeMillis() - time) / 1000);
    }
}
