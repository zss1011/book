package book.manager.service.impl;

import java.util.*;
import java.util.stream.Collectors;

import book.manager.dao.service.RoleDao;
import book.manager.dao.service.UserDao;
import book.manager.dao.service.UserRoleDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.dto.*;
import book.manager.domain.entity.Role;
import book.manager.domain.entity.User;
import book.manager.domain.entity.UserRole;
import book.manager.domain.vo.RoleVO;
import book.manager.domain.vo.UserPageVO;
import book.manager.domain.vo.UserVO;
import book.manager.service.UserService;
import book.manager.utils.*;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.common.collect.Lists;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

/**
 * @author: zss
 * @date: 2025/7/30
 * @desc: 用户接口
 */
@Slf4j
@Service
public class UserServiceImpl implements UserService {
    
    @Resource
    private UserDao userDao;
    @Resource
    private UserRoleDao userRoleDao;
    @Resource
    private RoleDao roleDao;
    
    /**
     * 注册用户
     *
     * @param dto
     */
    @Override
    public void registerUser(RegisterUserDTO dto) {
        User one = userDao.getByUsername(dto.getUsername());
        if (one != null) {
            throw new RuntimeException("用户已注册");
        }
        
        User user = buildUser(dto);
        userDao.save(user);
    }
    
    private User buildUser(RegisterUserDTO dto) {
        User user = new User();
        user.setUsername(dto.getUsername());
        user.setPassword(dto.getPassword());
        return user;
    }
    
    /**
     * 用户登入
     *
     * @param dto
     * @return
     */
    @Override
    public String login(LoginDTO dto) {
        User user = userDao.getByUsername(dto.getUsername());
        checkUser(dto, user);
        // 创建token
        return createToken(user);
    }
    
    private static String createToken(User user) {
        Map<String, Object> map = new HashMap<>();
        map.put("userId", user.getId());
        return JwtUtil.createJwtToken(map);
    }
    
    private static void checkUser(LoginDTO dto, User user) {
        if (user == null) {
            throw new RuntimeException("用户未注册");
        }
        
        if (!StrUtil.equals(user.getPassword(), dto.getPassword())) {
            throw new RuntimeException("用户密码错误");
        }
    }
    
    /**
     * 获取当前用户信息
     *
     * @param request
     * @return
     */
    @Override
    public UserVO getCurrentUser(HttpServletRequest request) {
        String userId = parseUserId(request);
        return buildUserVO(userId);
    }
    
    private UserVO buildUserVO(String userId) {
        User user = userDao.getById(userId);
        UserVO userVO = new UserVO();
        userVO.setId(user.getId());
        userVO.setUsername(user.getUsername());
        userVO.setPassword(user.getPassword());
        userVO.setRealName(user.getRealName());
        userVO.setAvatar(user.getAvatar());
        userVO.setPhone(user.getPhone());
        userVO.setEmail(user.getEmail());
        userVO.setLockStatus(user.getLockStatus());
        userVO.setMuteStatus(user.getMuteStatus());
        
        List<RoleVO> roles = getUserRoles(userId);
        userVO.setRoles(roles);
        
        return userVO;
    }
    
    /**
     * 获取用户角色
     *
     * @param userId
     * @return
     */
    private List<RoleVO> getUserRoles(String userId) {
        List<UserRole> userRoles = userRoleDao.listByUserId(userId);
        if (CollUtil.isEmpty(userRoles)) {
            return null;
        }
        
        List<String> roleIds = userRoles.stream().map(UserRole::getRoleId).collect(Collectors.toList());
        List<Role> roles = roleDao.listByIds(roleIds);
        List<RoleVO> roleVOS = BeanUtil.copyProperties(roles, RoleVO.class);
        return roleVOS;
    }
    
    public static String parseUserId(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");
        Map<String, Object> map = JwtUtil.parseJwtToken(authorization);
        return map.get("userId").toString();
    }
    
    /**
     * 分页查询:用户列表
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<UserPageVO> userPage(UserPageDTO pageDTO) {
        // 获取分页数据
        List<User> users = getPage(pageDTO);
        
        // 准备数据
        List<Role> roles = roleDao.list();
        List<UserRole> userRoles = userRoleDao.list();
        
        // 构建PageVO
        List<UserPageVO> pageVOS = new ArrayList<>();
        for (User user : users) {
            UserPageVO pageVO = buildUserPageVO(user, roles, userRoles);
            pageVOS.add(pageVO);
        }
        
        // 分页返回
        int total = pageVOS.size();
        pageVOS = ListUtil.listPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize(), total);
    }
    
    private UserPageVO buildUserPageVO(User user, List<Role> roles, List<UserRole> userRoles) {
        UserPageVO pageVO = new UserPageVO();
        pageVO.setId(user.getId());
        pageVO.setUsername(user.getUsername());
        pageVO.setRealName(user.getRealName());
        pageVO.setAvatar(user.getAvatar());
        pageVO.setPhone(user.getPhone());
        pageVO.setEmail(user.getEmail());
        
        List<String> roleIds = userRoles.stream()
                .filter(x -> StrUtil.equals(x.getUserId(), user.getId()))
                .map(UserRole::getRoleId)
                .collect(Collectors.toList());
        if (CollUtil.isNotEmpty(roleIds)) {
            List<RoleVO> roleVOS = new ArrayList<>();
            for (String roleId : roleIds) {
                Role role = roles.stream().filter(x -> StrUtil.equals(x.getId(), roleId)).findFirst().orElse(null);
                if (role == null)
                    continue;
                roleVOS.add(buildRoleVO(role));
            }
            pageVO.setRoles(roleVOS);
        }
        
        pageVO.setLockStatus(user.getLockStatus());
        pageVO.setMuteStatus(user.getMuteStatus());
        pageVO.setCreateTime(user.getCreateTime());
        return pageVO;
    }
    
    private RoleVO buildRoleVO(Role role) {
        RoleVO roleVO = new RoleVO();
        roleVO.setId(role.getId());
        roleVO.setRoleName(role.getRoleName());
        return roleVO;
    }
    
    private List<User> getPage(UserPageDTO pageDTO) {
        return userDao.lambdaQuery()
                .like(StrUtil.isNotBlank(pageDTO.getRealName()), User::getRealName, pageDTO.getRealName())
                .ge(pageDTO.getStartTime() != null, BaseUUID::getCreateTime, pageDTO.getStartTime())
                .le(pageDTO.getEndTime() != null, BaseUUID::getCreateTime, pageDTO.getEndTime())
                .eq(pageDTO.getMuteStatus() != null, User::getMuteStatus, pageDTO.getMuteStatus())
                .list();
    }
    
    /**
     * 修改用户信息
     *
     * @param dto
     */
    @Override
    public void updateUser(UserUpdateDTO dto) {
        User user = userDao.getById(dto.getUserId());
        user.setRealName(dto.getRealName());
        user.setAvatar(dto.getAvatar());
        user.setEmail(dto.getEmail());
        user.setLockStatus(dto.getLockStatus());
        user.setMuteStatus(dto.getMuteStatus());
        
        userDao.updateById(user);
    }
    
    /**
     * 根据userId获取用户
     *
     * @param userId
     * @return
     */
    @Override
    public UserVO getUserById(String userId) {
        return buildUserVO(userId);
    }
    
    /**
     * 确认密码
     *
     * @param password
     */
    @Override
    public boolean validPassword(String userId, String password) {
        User user = userDao.getById(userId);
        return StrUtil.equals(user.getPassword(), password);
    }
    
    /**
     * 修改密码
     *
     * @param dto
     */
    @Override
    public void updatePassword(UpdatePasswordDTO dto) {
        User user = userDao.getById(dto.getUserId());
        if (!StrUtil.equals(user.getPassword(), dto.getOldPassword()))
            throw new RuntimeException("修改失败:密码错误!");
        user.setPassword(dto.getNewPassword());
        userDao.updateById(user);
    }
}

























