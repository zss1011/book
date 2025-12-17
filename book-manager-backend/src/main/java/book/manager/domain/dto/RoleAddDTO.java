package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/8/21
 * @desc: 角色AddDTO
 */
@Data
@ApiModel(value = "角色AddDTO", description = "角色AddDTO")
public class RoleAddDTO {
    
    @NotBlank(message = "角色名不能为空")
    @ApiModelProperty("角色名")
    private String roleName;
    
}
