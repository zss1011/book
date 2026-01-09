package book.manager.service;

import book.manager.domain.dto.*;
import book.manager.domain.vo.*;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/12/18
 * @desc: 用户书籍关联
 */
public interface UserBookRelationService {
    
    /**
     * 用户书籍操作:订阅、收藏、借阅
     *
     * @param dto
     */
    void userBookOperation(UserBookOperationDTO dto);
    
    /**
     * 分页查询:用户已收藏书籍
     *
     * @param pageDTO
     * @return
     */
    Page<UserBookCollectPageVO> userBookRelationPage(UserBookRelationPageDTO pageDTO);
    
    /**
     * 分页查询:用户已订阅书籍
     *
     * @param pageDTO
     * @return
     */
    Page<UserBookSubscriptionPageVO> userBookSubscriptionPage(UserBookRelationPageDTO pageDTO);
    
    /**
     * 分页查询:用户已借阅书籍
     *
     * @param pageDTO
     * @return
     */
    Page<UserBookBorrowPageVO> userBookBorrowPage(UserBookBorrowPageDTO pageDTO);
    
    /**
     * 分页查询:用户订阅的书籍上架通知
     *
     * @param pageDTO
     * @return
     */
    Page<SubscriptionBookAddedPageVO> subscriptionBookAddedPage(SubscriptionBookAddedPageDTO pageDTO);
    
    /**
     * 用户阅读消息
     *
     * @param id
     */
    void readBookAddedMessage(String id);
    
    /**
     * 用户全部阅读:书籍上架消息
     *
     * @param userId
     */
    void readAllBookAddedMessage(String userId);
    
    /**
     * 删除:书籍上架消息
     *
     * @param id
     */
    void deleteBookAddedMessage(String id);
    
    /**
     * 分页查询:管理员端用户借阅记录
     *
     * @param pageDTO
     * @return
     */
    Page<BookBorrowPageVO> adminBookBorrowPage(BookBorrowPageDTO pageDTO);
}
