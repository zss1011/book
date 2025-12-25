package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/12/22
 * @desc: 密码修改DTO
 */
@Data
@ApiModel("密码修改DTO")
public class UpdatePasswordDTO {
    
    @ApiModelProperty("用户id")
    @NotBlank
    private String userId;
    
    @ApiModelProperty("旧密码")
    @NotBlank
    private String oldPassword;
    
    @ApiModelProperty("新密码")
    @NotBlank
    private String newPassword;
    
}
