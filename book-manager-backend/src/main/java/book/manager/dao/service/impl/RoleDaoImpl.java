package book.manager.dao.service.impl;

import book.manager.domain.entity.Role;
import book.manager.dao.mapper.RoleMapper;
import book.manager.dao.service.RoleDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-21
 */
@Service
public class RoleDaoImpl extends ServiceImpl<RoleMapper, Role> implements RoleDao {

}
