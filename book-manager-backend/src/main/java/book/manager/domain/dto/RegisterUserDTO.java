package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/7/30
 * @desc: 用户注册DTO
 */
@Data
@ApiModel(value = "用户注册DTO", description = "用户注册DTO")
public class RegisterUserDTO {
    
    @ApiModelProperty("用户名")
    @NotBlank(message = "用户名不能为空")
    private String username;
    
    @ApiModelProperty("密码")
    @NotBlank(message = "密码不能为空")
    private String password;
    
}
