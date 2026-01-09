package book.manager.controller;

import book.manager.dao.service.UserCommentDao;
import book.manager.domain.common.Response;
import book.manager.domain.dto.UserCommentAddDTO;
import book.manager.domain.dto.UserCommentPageDTO;
import book.manager.domain.vo.UserCommentVO;
import book.manager.service.UserCommentService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.List;

/**
 * @author: zss
 * @date: 2025/12/9
 * @desc: 用户评论
 */
@Api(tags = "用户评论")
@RestController
@RequestMapping("/user/comment/v1")
public class UserCommentController {
    
    @Resource
    private UserCommentService userCommentService;
    
    @ApiOperation("新增:用户评论")
    @PostMapping("/add")
    public Response<Boolean> addUserComment(@Valid @RequestBody UserCommentAddDTO dto) {
        userCommentService.addUserComment(dto);
        return Response.ok(true);
    }
    
    @ApiOperation("获取:用户评论")
    @GetMapping("/get")
    public Response<List<UserCommentVO>> getUserComments(@RequestParam String businessId) {
        return Response.ok(userCommentService.getUserComments(businessId));
    }
    
    @ApiOperation("获取:所有用户评论")
    @GetMapping("/all")
    public Response<List<List<UserCommentVO>>> getAllUserComments() {
        return Response.ok(userCommentService.getAllUserComments(new UserCommentPageDTO()));
    }
    
    @ApiOperation("分页查询:用户评论")
    @PostMapping("/page")
    public Response<Page<List<UserCommentVO>>> userCommentPage(@Valid @RequestBody UserCommentPageDTO dto) {
        return Response.ok(userCommentService.userCommentPage(dto));
    }
    
    @ApiOperation("删除:用户评论")
    @GetMapping("/delete")
    public Response<Boolean> deleteUserComment(@RequestParam String id) {
        userCommentService.deleteUserComment(id);
        return Response.ok(true);
    }
    
}























