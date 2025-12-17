import book.manager.MainApplication;
import book.manager.dao.service.UserDao;
import book.manager.dao.service.UserRoleDao;
import book.manager.domain.entity.User;
import book.manager.domain.entity.UserRole;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author: zss
 * @date: 2025/7/31
 * @desc:
 */
@SpringBootTest(classes = MainApplication.class)
public class MyTest {
    
    @Resource
    private UserDao userDao;
    @Resource
    private UserRoleDao userRoleDao;
    
    @Test
    public void test01() {
        List<User> users = userDao.list();
        for (User user : users) {
            UserRole userRole = new UserRole();
            userRole.setUserId(user.getId());
            userRole.setRoleId("e9e1bb49218fbbb98910e69c8234c50e");
            userRoleDao.save(userRole);
        }
    }
    
}
