package book.manager.threadLocal;

import book.manager.domain.vo.UserVO;

/**
 * @author: zss
 * @date: 2025/12/18
 * @desc: 当前用户信息
 */
public class UserContext {
    
    public static ThreadLocal<UserVO> userLoacl = new ThreadLocal<>();
    
    public static void setUser(UserVO userVO) {
        userLoacl.set(userVO);
    }
    
    public static UserVO getUser() {
        return userLoacl.get();
    }
    
    public static String getUserId() {
        return userLoacl.get().getId();
    }
    
    public static void removeUser() {
        userLoacl.remove();
    }
    
}
