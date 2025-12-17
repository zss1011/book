package book.manager.dao.service.impl;

import book.manager.domain.entity.Book;
import book.manager.dao.mapper.BookMapper;
import book.manager.dao.service.BookDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 书籍表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-09-02
 */
@Service
public class BookDaoImpl extends ServiceImpl<BookMapper, Book> implements BookDao {

}
