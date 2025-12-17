package book.manager.dao.service.impl;

import book.manager.domain.entity.SystemConfig;
import book.manager.dao.mapper.SystemConfigMapper;
import book.manager.dao.service.SystemConfigDao;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

/**
 * <p>
 * 系统配置表 服务实现类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-23
 */
@Service
public class SystemConfigDaoImpl extends ServiceImpl<SystemConfigMapper, SystemConfig> implements SystemConfigDao {
    
    @Override
    public SystemConfig getByConfigName(String configName) {
        return this.lambdaQuery()
                .eq(SystemConfig::getConfigName, configName)
                .one();
    }
}
