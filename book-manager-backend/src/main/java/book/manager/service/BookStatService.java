package book.manager.service;

import book.manager.domain.vo.BookStatBaseInfoVO;

import java.util.List;

/**
 * @author: zss
 * @date: 2026/1/12
 * @desc: 书籍统计
 */
public interface BookStatService {
    
    /**
     * 书籍情况统计:预售、上架、借阅、收藏
     *
     * @return
     */
    List<BookStatBaseInfoVO> bookStatBaseInfo();
    
}
