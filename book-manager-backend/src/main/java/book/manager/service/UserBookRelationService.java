package book.manager.service;

import book.manager.domain.dto.UserBookOperationDTO;
import book.manager.domain.dto.UserBookRelationPageDTO;
import book.manager.domain.vo.UserBookCollectPageVO;
import book.manager.domain.vo.UserBookSubscriptionPageVO;
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
}
