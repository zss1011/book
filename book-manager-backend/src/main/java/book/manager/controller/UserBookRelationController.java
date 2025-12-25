package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.domain.dto.UserBookOperationDTO;
import book.manager.domain.dto.UserBookRelationPageDTO;
import book.manager.domain.vo.UserBookCollectPageVO;
import book.manager.domain.vo.UserBookSubscriptionPageVO;
import book.manager.service.UserBookRelationService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
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
    
}
