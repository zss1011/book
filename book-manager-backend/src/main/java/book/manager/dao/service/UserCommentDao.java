package book.manager.dao.service;

import book.manager.domain.dto.UserCommentAddDTO;
import book.manager.domain.entity.UserComment;
import book.manager.domain.vo.UserCommentVO;
import com.baomidou.mybatisplus.extension.service.IService;

import javax.validation.Valid;
import java.util.List;

/**
 * <p>
 * 用户评论表 服务类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-12-09
 */
public interface UserCommentDao extends IService<UserComment> {
    
    List<UserComment> listByBusinessId(String businessId);
    
}
