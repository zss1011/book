package book.manager.service;

import book.manager.domain.dto.RoleAddDTO;
import book.manager.domain.dto.UserRoleAddDTO;

import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/8/21
 * @desc: 角色 service
 */
public interface RoleService {
    
    /**
     * 新增:角色
     *
     * @param addDTO
     */
    void addRole(RoleAddDTO addDTO);
    
    /**
     * 新增:用户角色
     *
     * @param addDTO
     */
    void addUserRole(UserRoleAddDTO addDTO);
    
}
