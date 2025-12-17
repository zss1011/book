package book.manager.dao.service.impl;

import book.manager.domain.entity.CommonFile;
import book.manager.dao.mapper.CommonFileMapper;
import book.manager.dao.service.CommonFileDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 文件表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-09-30
 */
@Service
public class CommonFileDaoImpl extends ServiceImpl<CommonFileMapper, CommonFile> implements CommonFileDao {

}
