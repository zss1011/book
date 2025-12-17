package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * @author: zss
 * @date: 2025/8/19
 * @desc: 用户分页查询PageVO
 */
@Data
@ApiModel("用户分页查询PageVO")
public class UserPageVO {
    
    @ApiModelProperty("用户id")
    private String id;
    
    @ApiModelProperty("用户账户")
    private String username;
    
    @ApiModelProperty("用户姓名")
    private String realName;
    
    @ApiModelProperty("头像")
    private String avatar;
    
    @ApiModelProperty("联系方式")
    private String phone;
    
    @ApiModelProperty("邮箱")
    private String email;
    
    @ApiModelProperty("角色列表")
    private List<RoleVO> roles;
    
    @ApiModelProperty("账号锁定状态:0正常 1锁定")
    private Integer lockStatus;
    
    @ApiModelProperty("账号禁言状态:0正常 1禁言")
    private Integer muteStatus;
    
    @ApiModelProperty("创建时间")
    private Date createTime;
    
}
