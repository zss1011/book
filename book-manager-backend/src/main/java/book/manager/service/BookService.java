package book.manager.service;

import book.manager.domain.dto.BookAddDTO;
import book.manager.domain.dto.BookPageDTO;
import book.manager.domain.dto.BookUpdateDTO;
import book.manager.domain.vo.BookPageVO;
import book.manager.domain.vo.BookVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/9/2
 * @desc: 书籍 service
 */
public interface BookService {
    
    /**
     * 新增书籍
     *
     * @param addDTO
     */
    void addBook(BookAddDTO addDTO);
    
    /**
     * 分页查询:书籍
     *
     * @param pageDTO
     * @return
     */
    Page<BookPageVO> bookPage(BookPageDTO pageDTO);
    
    /**
     * 删除:书籍
     *
     * @param bookId
     */
    void deleteBook(String bookId);
    
    /**
     * 获取:书籍详情
     *
     * @param bookId
     * @return
     */
    BookVO bookDetail(String bookId);
    
    /**
     * 修改:书籍
     *
     * @param updateDTO
     */
    void updateBook(BookUpdateDTO updateDTO);
    
    /**
     * 上架:书籍
     *
     * @param bookId
     */
    void addedBook(String bookId);
}
