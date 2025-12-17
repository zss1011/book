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
 * @since 2025-07-30
 */
@Data
@TableName("user")
@ApiModel(value = "User对象", description = "用户表")
public class User extends BaseUUID implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @ApiModelProperty("用户账户")
    private String username;
    
    @ApiModelProperty("用户密码")
    private String password;
    
    @ApiModelProperty("用户姓名")
    private String realName;
    
    @ApiModelProperty("头像")
    private String avatar;
    
    @ApiModelProperty("联系方式")
    private String phone;
    
    @ApiModelProperty("邮箱")
    private String email;
    
    @ApiModelProperty("账号锁定状态:0正常 1锁定")
    private Integer lockStatus;
    
    @ApiModelProperty("账号禁言状态:0正常 1禁言")
    private Integer muteStatus;
    
}
