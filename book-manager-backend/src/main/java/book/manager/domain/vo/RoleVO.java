package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: zss
 * @date: 2025/8/23
 * @desc: 角色VO
 */
@Data
@ApiModel(value = "角色VO", description = "角色VO")
public class RoleVO {
    
    @ApiModelProperty("角色id")
    private String id;
    
    @ApiModelProperty("角色名")
    private String roleName;
    
}
