package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/8/21
 * @desc: 用户角色关联 AddDTO
 */
@Data
@ApiModel(value = "用户角色关联 AddDTO", description = "用户角色关联 AddDTO")
public class UserRoleAddDTO {
    
    @ApiModelProperty("角色id")
    @NotBlank(message = "角色id不能为空")
    private String roleId;
    
    @ApiModelProperty("用户id")
    @NotBlank(message = "用户id不能为空")
    private String userId;
    
}
