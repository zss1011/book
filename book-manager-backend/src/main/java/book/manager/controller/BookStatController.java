package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.domain.vo.BookStatBaseInfoVO;
import book.manager.service.BookStatService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author: zss
 * @date: 2026/1/10
 * @desc: 书籍统计
 */
@Api(tags = "书籍统计")
@RestController
@RequestMapping("/book/stat/v1")
public class BookStatController {
    
    @Resource
    private BookStatService bookStatService;
    
    @ApiOperation("书籍情况统计:预售、上架、借阅、收藏")
    @GetMapping("/base/info")
    public Response<List<BookStatBaseInfoVO>> bookStatBaseInfo(){
        return Response.ok(bookStatService.bookStatBaseInfo());
    }
    
    
}
