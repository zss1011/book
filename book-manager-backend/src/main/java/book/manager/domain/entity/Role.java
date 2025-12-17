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
 * 
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-21
 */
@Data
@TableName("role")
@ApiModel(value = "Role对象", description = "角色表")
public class Role extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("角色名")
    private String roleName;
    
}
