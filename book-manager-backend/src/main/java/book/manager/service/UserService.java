package book.manager.service;

import book.manager.domain.dto.*;
import book.manager.domain.vo.UserPageVO;
import book.manager.domain.vo.UserVO;
import book.manager.utils.JsonUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.common.collect.Lists;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: zss
 * @date: 2025/7/30
 * @desc: 用户接口
 */
public interface UserService {
    
    /**
     * 注册用户
     *
     * @param dto
     */
    void registerUser(RegisterUserDTO dto);
    
    /**
     * 用户登入
     *
     * @param dto
     * @return
     */
    String login(LoginDTO dto);
    
    /**
     * 获取当前用户信息
     *
     * @param request
     * @return
     */
    UserVO getCurrentUser(HttpServletRequest request);
    
    /**
     * 分页查询:用户列表
     *
     * @param pageDTO
     * @return
     */
    Page<UserPageVO> userPage(UserPageDTO pageDTO);
    
    /**
     * 修改用户信息
     *
     * @param dto
     */
    void updateUser(UserUpdateDTO dto);
    
    /**
     * 根据userId获取用户
     *
     * @param userId
     * @return
     */
    UserVO getUserById(String userId);
    
    /**
     * 确认密码
     *
     * @param password
     */
    boolean validPassword(String userId, String password);
    
    /**
     * 修改密码
     *
     * @param dto
     */
    void updatePassword(UpdatePasswordDTO dto);
}
