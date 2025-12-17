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
 * 用户角色关联表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-08-21
 */
@Data
@TableName("user_role")
@ApiModel(value = "UserRole对象", description = "用户角色关联表")
public class UserRole extends BaseUUID implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @ApiModelProperty("角色id")
    private String roleId;
    
    @ApiModelProperty("用户id")
    private String userId;
    
}
