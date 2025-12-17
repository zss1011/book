package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.service.SystemConfigService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author: zss
 * @date: 2025/10/22
 * @desc: 系统配置接口
 */
@Api(tags = "系统配置接口")
@RestController
@RequestMapping("/system/config/v1")
public class SystemConfigController {
    
    @Resource
    private SystemConfigService systemConfigService;
    
    @ApiOperation("查询:书架配置")
    @GetMapping("/bookrack")
    public Response<List<String>> bookrackConfig() {
        return Response.ok(systemConfigService.bookrackConfig());
    }
    
    @ApiOperation("查询:书籍类别")
    @GetMapping("/book/type")
    public Response<List<String>> bookTypeConfig() {
        return Response.ok(systemConfigService.bookTypeConfig());
    }
    
    @ApiOperation("修改:书籍类别")
    @GetMapping("/book/type/update")
    public Response<Boolean> updateBookTypeConfig(@RequestParam String oldBookType, @RequestParam String newBookType) {
        systemConfigService.updateBookTypeConfig(oldBookType, newBookType);
        return Response.ok(true);
    }
    
    @ApiOperation("删除:书籍类别")
    @GetMapping("/book/type/delete")
    public Response<Boolean> deleteBookTypeConfig(@RequestParam String bookType) {
        systemConfigService.deleteBookTypeConfig(bookType);
        return Response.ok(true);
    }
    
    @ApiOperation("新增:书籍类别")
    @GetMapping("/book/type/add")
    public Response<Boolean> addBookTypeConfig(@RequestParam String bookType) {
        systemConfigService.addBookTypeConfig(bookType);
        return Response.ok(true);
    }
    
    @ApiOperation("修改:书架配置")
    @GetMapping("/bookrack/update")
    public Response<Boolean> updateBookrackConfig(@RequestParam String oldBookrack, @RequestParam String newBookrack) {
        systemConfigService.updateBookrackConfig(oldBookrack, newBookrack);
        return Response.ok(true);
    }
    
    @ApiOperation("删除:书架配置")
    @GetMapping("/bookrack/delete")
    public Response<Boolean> deleteBookrackConfig(@RequestParam String bookrack) {
        systemConfigService.deleteBookrackConfig(bookrack);
        return Response.ok(true);
    }
    
}

















