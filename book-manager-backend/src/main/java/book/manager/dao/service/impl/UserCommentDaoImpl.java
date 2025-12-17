package book.manager.dao.service.impl;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import book.manager.domain.dto.UserCommentAddDTO;
import book.manager.domain.entity.UserComment;
import book.manager.dao.mapper.UserCommentMapper;
import book.manager.dao.service.UserCommentDao;
import book.manager.domain.vo.UserCommentVO;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * <p>
 * 用户评论表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-12-09
 */
@Service
public class UserCommentDaoImpl extends ServiceImpl<UserCommentMapper, UserComment> implements UserCommentDao {
    
    @Override
    public List<UserComment> listByBusinessId(String businessId) {
        return this.lambdaQuery()
                .eq(UserComment::getBusinessId, businessId)
                .list();
    }
}





























