package book.manager.interceptor;

import book.manager.domain.vo.UserVO;
import book.manager.service.UserService;
import book.manager.threadLocal.UserContext;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author: zss
 * @date: 2025/12/18
 * @desc: 缓存当前用户信息
 */
@Slf4j
@Component
public class UserInterceptor implements HandlerInterceptor {
    
    @Resource
    private UserService userService;
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        UserVO userVO = userService.getCurrentUser(request);
        UserContext.setUser(userVO);
        return true;
    }
    
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        UserContext.removeUser();
    }
}
