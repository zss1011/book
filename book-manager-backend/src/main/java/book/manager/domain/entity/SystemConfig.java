package book.manager.domain.entity;

import book.manager.domain.common.BaseUUID;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * <p>
 * 系统配置表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-23
 */
@Data
@TableName("system_config")
@ApiModel(value = "SystemConfig对象", description = "系统配置表")
public class SystemConfig extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("配置名")
    private String configName;

    @ApiModelProperty("配置内容")
    private String configContent;
    
}
