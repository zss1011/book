package book.manager.dao.service.impl;

import book.manager.domain.common.BaseUUID;
import book.manager.domain.entity.UserBookRelation;
import book.manager.dao.mapper.UserBookRelationMapper;
import book.manager.dao.service.UserBookRelationDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * <p>
 * 用户书籍表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-12-17
 */
@Service
public class UserBookRelationDaoImpl extends ServiceImpl<UserBookRelationMapper, UserBookRelation> implements UserBookRelationDao {
    
    @Override
    public List<UserBookRelation> listByUserId(String userId) {
        return this.lambdaQuery()
                .eq(UserBookRelation::getUserId, userId)
                .list();
    }
    
    @Override
    public List<UserBookRelation> listByUserIdAndCollectStatus(String userId, int collectStatus) {
        return this.lambdaQuery()
                .eq(UserBookRelation::getUserId, userId)
                .eq(UserBookRelation::getCollectStatus, collectStatus)
                .list();
    }
    
    @Override
    public List<UserBookRelation> listByUserIdAndBorrowStatus(String userId, int borrowStatus) {
        return this.lambdaQuery()
                .eq(UserBookRelation::getUserId, userId)
                .eq(UserBookRelation::getBorrowStatus, borrowStatus)
                .list();
    }
    
    @Override
    public List<UserBookRelation> listByUserIdAndSubscriptionStatus(String userId, int subscriptionStatus) {
        return this.lambdaQuery()
                .eq(UserBookRelation::getUserId, userId)
                .eq(UserBookRelation::getSubscriptionStatus, subscriptionStatus)
                .list();
    }
    
    @Override
    public List<UserBookRelation> listByBookIdAndSubscriptionStatus(String bookId, int subscriptionStatus) {
        return this.lambdaQuery()
                .eq(UserBookRelation::getBookId, bookId)
                .eq(UserBookRelation::getSubscriptionStatus, subscriptionStatus)
                .list();
    }
    
    @Override
    public List<UserBookRelation> listBySubscriptionStatus(int subscriptionStatus) {
        return this.lambdaQuery()
                .eq(UserBookRelation::getSubscriptionStatus, 1)
                .orderByDesc(BaseUUID::getCreateTime)
                .list();
    }
}















