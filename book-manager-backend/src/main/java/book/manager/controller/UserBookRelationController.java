package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.domain.dto.*;
import book.manager.domain.vo.*;
import book.manager.service.UserBookRelationService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/12/17
 * @desc: 用户书籍关联
 */
@Api(tags = "用户书籍关联")
@RestController
@RequestMapping("/user/book/relation/v1")
public class UserBookRelationController {
    
    @Resource
    private UserBookRelationService userBookRelationService;
    
    @ApiOperation("用户书籍操作:订阅、收藏、借阅")
    @PostMapping("/operation")
    public Response<Boolean> userBookOperation(@Valid @RequestBody UserBookOperationDTO dto) {
        userBookRelationService.userBookOperation(dto);
        return Response.ok(true);
    }
    
    @ApiOperation("分页查询:用户已收藏书籍")
    @PostMapping("/page")
    public Response<Page<UserBookCollectPageVO>> userBookRelationPage(@Valid @RequestBody UserBookRelationPageDTO pageDTO) {
        return Response.ok(userBookRelationService.userBookRelationPage(pageDTO));
    }
    
    @ApiOperation("分页查询:用户已订阅书籍")
    @PostMapping("/subscription/page")
    public Response<Page<UserBookSubscriptionPageVO>> userBookSubscriptionPage(@Valid @RequestBody UserBookRelationPageDTO pageDTO) {
        return Response.ok(userBookRelationService.userBookSubscriptionPage(pageDTO));
    }
    
    @ApiOperation("管理员分页查询:用户已订阅书籍")
    @PostMapping("/admin/subscription/page")
    public Response<Page<UserBookSubscriptionPageVO>> adminUserBookSubscriptionPage(@Valid @RequestBody AdminUserBookSubscriptionPageDTO pageDTO) {
        return Response.ok(userBookRelationService.adminUserBookSubscriptionPage(pageDTO));
    }
    
    @ApiOperation("分页查询:用户已借阅书籍")
    @PostMapping("/borrow/page")
    public Response<Page<UserBookBorrowPageVO>> userBookBorrowPage(@Valid @RequestBody UserBookBorrowPageDTO pageDTO) {
        return Response.ok(userBookRelationService.userBookBorrowPage(pageDTO));
    }
    
    @ApiOperation("分页查询:用户订阅的书籍上架通知")
    @PostMapping("/subscription/book/added/page")
    public Response<Page<SubscriptionBookAddedPageVO>> subscriptionBookAddedPage(@Valid @RequestBody SubscriptionBookAddedPageDTO pageDTO) {
        return Response.ok(userBookRelationService.subscriptionBookAddedPage(pageDTO));
    }
    
    @ApiOperation("用户阅读:书籍上架消息")
    @GetMapping("/read/book/added/message")
    public Response<Boolean> readBookAddedMessage(@RequestParam String id) {
        userBookRelationService.readBookAddedMessage(id);
        return Response.ok(true);
    }
    
    @ApiOperation("用户全部阅读:书籍上架消息")
    @GetMapping("/read/all/book/added/message")
    public Response<Boolean> readAllBookAddedMessage(@RequestParam String userId) {
        userBookRelationService.readAllBookAddedMessage(userId);
        return Response.ok(true);
    }
    
    @ApiOperation("删除:书籍上架消息")
    @GetMapping("/delete/book/added/message")
    public Response<Boolean> deleteBookAddedMessage(@RequestParam String id) {
        userBookRelationService.deleteBookAddedMessage(id);
        return Response.ok(true);
    }
    
    @ApiOperation("分页查询:管理员端用户借阅记录")
    @PostMapping("/admin/book/borrow/page")
    public Response<Page<BookBorrowPageVO>> adminBookBorrowPage(@Valid @RequestBody BookBorrowPageDTO pageDTO) {
        return Response.ok(userBookRelationService.adminBookBorrowPage(pageDTO));
    }
    
    @ApiOperation("删除:用户借阅记录")
    @GetMapping("/delete/book/borrow")
    public Response<Boolean> deleteBookBorrow(@RequestParam String id) {
        userBookRelationService.deleteBookBorrow(id);
        return Response.ok(true);
    }
    
}
