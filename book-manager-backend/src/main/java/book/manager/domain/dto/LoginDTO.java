package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/8/1
 * @desc: 用户登入DTO
 */
@Data
@ApiModel(value = "用户登入DTO", description = "用户登入DTO")
public class LoginDTO {
    
    @ApiModelProperty("用户账户")
    @NotBlank(message = "用户账户不能为空")
    private String username;
    
    @ApiModelProperty("用户密码")
    @NotBlank(message = "用户密码不能为空")
    private String password;
    
}
