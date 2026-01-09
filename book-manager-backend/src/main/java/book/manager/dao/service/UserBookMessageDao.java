package book.manager.dao.service;

import book.manager.domain.entity.UserBookMessage;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * <p>
 * 用户书籍消息表 服务类
 * </p>
 *
 * @author mybatis-plus
 * @since 2026-01-01
 */
public interface UserBookMessageDao extends IService<UserBookMessage> {
    
    UserBookMessage getByUserIdAndBookId(String userId, String bookId);
    
    List<UserBookMessage> listByUserId(String userId);
}
