package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.domain.dto.RoleAddDTO;
import book.manager.domain.dto.UserRoleAddDTO;
import book.manager.service.RoleService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/8/21
 * @desc: 角色接口
 */
@Api(tags = "角色接口")
@RestController
@RequestMapping("/role/v1")
public class RoleController {
    
    @Resource
    private RoleService roleService;
    
    @ApiOperation("新增:角色")
    @PostMapping("/add")
    public Response<Boolean> addRole(@Valid @RequestBody RoleAddDTO addDTO) {
        roleService.addRole(addDTO);
        return Response.ok(true);
    }
    
    @ApiOperation("新增:用户角色")
    @PostMapping("/user/role/add")
    public Response<Boolean> addUserRole(@Valid @RequestBody UserRoleAddDTO addDTO) {
        roleService.addUserRole(addDTO);
        return Response.ok(true);
    }
    
}
