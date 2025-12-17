package book.manager.service.impl;

import java.util.Date;

import book.manager.dao.service.RoleDao;
import book.manager.dao.service.UserRoleDao;
import book.manager.domain.dto.RoleAddDTO;
import book.manager.domain.dto.UserRoleAddDTO;
import book.manager.domain.entity.Role;
import book.manager.domain.entity.UserRole;
import book.manager.service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author: zss
 * @date: 2025/8/21
 * @desc: 角色 serviceImpl
 */
@Slf4j
@Service
public class RoleServiceImpl implements RoleService {
    
    @Resource
    private RoleDao roleDao;
    @Resource
    private UserRoleDao userRoleDao;
    
    /**
     * 新增:角色
     *
     * @param addDTO
     */
    @Override
    public void addRole(RoleAddDTO addDTO) {
        Role role = new Role();
        role.setRoleName(addDTO.getRoleName());
        roleDao.save(role);
    }
    
    /**
     * 新增:用户角色
     *
     * @param addDTO
     */
    @Override
    public void addUserRole(UserRoleAddDTO addDTO) {
        UserRole userRole = new UserRole();
        userRole.setUserId(addDTO.getUserId());
        userRole.setRoleId(addDTO.getRoleId());
        userRoleDao.save(userRole);
    }
}
