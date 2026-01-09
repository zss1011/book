package book.manager.dao.service.impl;

import book.manager.domain.entity.UserBookMessage;
import book.manager.dao.mapper.UserBookMessageMapper;
import book.manager.dao.service.UserBookMessageDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * <p>
 * 用户书籍消息表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2026-01-01
 */
@Service
public class UserBookMessageDaoImpl extends ServiceImpl<UserBookMessageMapper, UserBookMessage> implements UserBookMessageDao {
    
    @Override
    public UserBookMessage getByUserIdAndBookId(String userId, String bookId) {
        return this.lambdaQuery()
                .eq(UserBookMessage::getUserId, userId)
                .eq(UserBookMessage::getBookId, bookId)
                .one();
    }
    
    @Override
    public List<UserBookMessage> listByUserId(String userId) {
        return this.lambdaQuery()
                .eq(UserBookMessage::getUserId, userId)
                .list();
    }
}
