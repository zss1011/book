package book.manager.interceptor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.annotation.Resource;

/**
 * @author: zss
 * @date: 2025/12/18
 * @desc: 拦截器配置
 */
@Slf4j
@Configuration
public class InterceptorConfig implements WebMvcConfigurer {
    
    @Resource
    private UserInterceptor userInterceptor;
    
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(userInterceptor)
                .addPathPatterns("/**")
                .excludePathPatterns("/**/doc.html", "/webjars/**", "/swagger*/**", "/**/register", "/**/login", "/**/v2/api-docs")
                .order(1);
    }
}
