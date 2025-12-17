package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/11/18
 * @desc: 用户修改DTO
 */
@Data
@ApiModel(value = "用户修改DTO", description = "用户修改DTO")
public class UserUpdateDTO {
    
    @ApiModelProperty("用户id")
    @NotBlank(message = "用户id不能为空")
    private String userId;
    
    @ApiModelProperty("用户姓名")
    private String realName;
    
    @ApiModelProperty("头像")
    private String avatar;
    
    @ApiModelProperty("邮箱")
    private String email;
    
    @ApiModelProperty("账号锁定状态:0正常 1锁定")
    private Integer lockStatus;
    
    @ApiModelProperty("账号禁言状态:0正常 1禁言")
    private Integer muteStatus;
    
}
