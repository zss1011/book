package book.manager.domain.vo;

import book.manager.domain.common.BaseUUID;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * <p>
 *
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-07-30
 */
@Data
@ApiModel(value = "UserVO", description = "")
public class UserVO {
    
    @ApiModelProperty("用户id")
    private String id;
    
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
    
    @ApiModelProperty("用户角色")
    private List<RoleVO> roles;
    
}
