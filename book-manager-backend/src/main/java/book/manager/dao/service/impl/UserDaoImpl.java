package book.manager.dao.service.impl;

import book.manager.domain.entity.User;
import book.manager.dao.mapper.UserMapper;
import book.manager.dao.service.UserDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-07-30
 */
@Service
public class UserDaoImpl extends ServiceImpl<UserMapper, User> implements UserDao {
    
    @Override
    public User getByUsername(String username) {
        return this.lambdaQuery()
                .eq(User::getUsername, username)
                .one();
    }
}
