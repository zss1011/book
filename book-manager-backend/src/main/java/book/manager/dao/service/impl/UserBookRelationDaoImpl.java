package book.manager.dao.service.impl;

import book.manager.domain.entity.UserBookRelation;
import book.manager.dao.mapper.UserBookRelationMapper;
import book.manager.dao.service.UserBookRelationDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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

}
