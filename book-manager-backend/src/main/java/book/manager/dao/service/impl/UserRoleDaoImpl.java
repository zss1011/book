package book.manager.dao.service.impl;

import book.manager.domain.entity.UserRole;
import book.manager.dao.mapper.UserRoleMapper;
import book.manager.dao.service.UserRoleDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * <p>
 * 用户角色关联表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-21
 */
@Service
public class UserRoleDaoImpl extends ServiceImpl<UserRoleMapper, UserRole> implements UserRoleDao {
    
    @Override
    public List<UserRole> listByUserId(String userId) {
        return this.lambdaQuery()
                .eq(UserRole::getUserId, userId)
                .list();
    }
}
