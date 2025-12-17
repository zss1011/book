package book.manager.dao.service;

import book.manager.domain.entity.SystemConfig;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;

/**
 * <p>
 * 系统配置表 服务类
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-23
 */
public interface SystemConfigDao extends IService<SystemConfig> {
    
    SystemConfig getByConfigName(String configName);
    
}
