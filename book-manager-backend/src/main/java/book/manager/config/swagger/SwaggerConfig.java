package book.manager.config.swagger;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @author: zss
 * @date: 2023/10/19
 * @desc: swagger分组配置
 */
@Configuration
@EnableSwagger2
@ConditionalOnProperty(name = "spring.profiles.active", havingValue = "dev")
public class SwaggerConfig {

    @Bean
    public Docket docket01() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("All全部业务")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.backend"))
                .paths(PathSelectors.any())
                .build();
    }
}
