package book.manager.dao.service;

import book.manager.domain.entity.UserRole;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 用户角色关联表 服务类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-21
 */
public interface UserRoleDao extends IService<UserRole> {
    
    List<UserRole> listByUserId(String userId);
    
}
