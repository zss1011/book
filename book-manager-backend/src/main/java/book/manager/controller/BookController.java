package book.manager.controller;

import book.manager.domain.common.Response;
import book.manager.domain.dto.BookAddDTO;
import book.manager.domain.dto.BookPageDTO;
import book.manager.domain.dto.BookUpdateDTO;
import book.manager.domain.vo.BookPageVO;
import book.manager.domain.vo.BookVO;
import book.manager.service.BookService;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/9/2
 * @desc: 书籍接口
 */
@Api(tags = "书籍接口")
@RestController
@RequestMapping("/book/v1")
public class BookController {
    
    @Resource
    private BookService bookService;
    
    @ApiOperation("新增书籍")
    @PostMapping("/add")
    public Response<Boolean> addBook(@Valid @RequestBody BookAddDTO addDTO) {
        bookService.addBook(addDTO);
        return Response.ok(true);
    }
    
    @ApiOperation("分页查询:书籍")
    @PostMapping("/page")
    public Response<Page<BookPageVO>> bookPage(@Valid @RequestBody BookPageDTO pageDTO) {
        return Response.ok(bookService.bookPage(pageDTO));
    }
    
    @ApiOperation("删除:书籍")
    @GetMapping("/delete")
    public Response<Boolean> deleteBook(@RequestParam String bookId) {
        bookService.deleteBook(bookId);
        return Response.ok(true);
    }
    
    @ApiOperation("获取:书籍详情")
    @GetMapping("/detail")
    public Response<BookVO> bookDetail(@RequestParam String bookId) {
        return Response.ok(bookService.bookDetail(bookId));
    }
    
    @ApiOperation("修改:书籍")
    @PostMapping("/update")
    public Response<Boolean> updateBook(@Valid @RequestBody BookUpdateDTO updateDTO) {
        bookService.updateBook(updateDTO);
        return Response.ok(true);
    }
    
}
