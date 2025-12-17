package book.manager.dao.service;

import book.manager.domain.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.validation.constraints.NotBlank;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-07-30
 */
public interface UserDao extends IService<User> {
    
    User getByUsername(String username);
    
}
