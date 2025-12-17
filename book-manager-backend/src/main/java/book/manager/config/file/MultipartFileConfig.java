package book.manager.config.file;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.servlet.MultipartConfigElement;

/**
 * @author: zss
 * @date: 2023/4/27
 * @desc: springboot临时文件上传文件夹配置
 */
@Configuration
public class MultipartFileConfig {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        String property = System.getProperty("os.name");
        String location = null;
        if (property.contains("Linux") || property.contains("linux")) {
            location = "/usr";
        }
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setLocation(location);
        
        // 设置文件大小限制
        factory.setMaxFileSize(org.springframework.util.unit.DataSize.parse("5000MB"));
        factory.setMaxRequestSize(org.springframework.util.unit.DataSize.parse("5000MB"));
        
        return factory.createMultipartConfig();
    }

}