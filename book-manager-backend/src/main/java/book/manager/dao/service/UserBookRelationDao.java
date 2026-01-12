package book.manager.dao.service;

import book.manager.domain.entity.UserBookRelation;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * <p>
 * 用户书籍表 服务类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-12-17
 */
public interface UserBookRelationDao extends IService<UserBookRelation> {
    
    List<UserBookRelation> listByUserId(String userId);
    
    List<UserBookRelation> listByUserIdAndCollectStatus(String userId, int collectStatus);
    
    List<UserBookRelation> listByUserIdAndBorrowStatus(String userId, int borrowStatus);
    
    List<UserBookRelation> listByUserIdAndSubscriptionStatus(String userId, int subscriptionStatus);
    
    List<UserBookRelation> listByBookIdAndSubscriptionStatus(String bookId, int subscriptionStatus);
    
    List<UserBookRelation> listBySubscriptionStatus(int subscriptionStatus);
}
