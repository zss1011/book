package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.domain.dto.*;
import book.manager.domain.vo.UserPageVO;
import book.manager.domain.vo.UserVO;
import book.manager.service.UserService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/7/30
 * @desc: 用户接口
 */
@Api(tags = "用户接口")
@RestController
@RequestMapping("/user/v1")
public class UserController {
    
    @Resource
    private UserService userService;
    
    @ApiOperation("注册用户")
    @PostMapping("/register")
    public Response<Boolean> registerUser(@Valid @RequestBody RegisterUserDTO dto) {
        userService.registerUser(dto);
        return Response.ok(true);
    }
    
    @ApiOperation("用户登入")
    @PostMapping("/login")
    public Response<String> login(@Valid @RequestBody LoginDTO dto) {
        return Response.ok(userService.login(dto));
    }
    
    @ApiOperation("获取当前用户信息")
    @GetMapping("/current/user/detail")
    public Response<UserVO> getCurrentUser(HttpServletRequest request) {
        return Response.ok(userService.getCurrentUser(request));
    }
    
    @ApiOperation("根据id获取用户信息")
    @GetMapping("/user/detail")
    public Response<UserVO> getUserById(@RequestParam String id) {
        return Response.ok(userService.getUserById(id));
    }
    
    @ApiOperation("分页查询:用户列表")
    @PostMapping("/page")
    public Response<Page<UserPageVO>> userPage(@Valid @RequestBody UserPageDTO pageDTO) {
        return Response.ok(userService.userPage(pageDTO));
    }
    
    @ApiOperation("修改用户信息")
    @PostMapping("/update")
    public Response<Boolean> updateUser(@Valid @RequestBody UserUpdateDTO dto) {
        userService.updateUser(dto);
        return Response.ok(true);
    }
    
    @ApiOperation("确认密码")
    @GetMapping("/valid/password")
    public Response<Boolean> validPassword(@RequestParam String userId, @RequestParam String password) {
        return Response.ok(userService.validPassword(userId, password));
    }
    
    @ApiOperation("修改密码")
    @PostMapping("/update/password")
    public Response<Boolean> updatePassword(@Valid @RequestBody UpdatePasswordDTO dto) {
        userService.updatePassword(dto);
        return Response.ok(true);
    }
    
    
}

















