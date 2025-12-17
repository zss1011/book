package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/8/19
 * @desc: 用户分页查询PageDTO
 */
@Data
@ApiModel("用户分页查询PageDTO")
public class UserPageDTO extends PageDTO {
    
    @ApiModelProperty("登入状态:0未登入 1登入")
    private Integer loginStatus;
    
    @ApiModelProperty("账号禁言状态:0正常 1禁言")
    private Integer muteStatus;
    
    @ApiModelProperty("注册开始时间")
    private Date startTime;
    
    @ApiModelProperty("注册结束时间")
    private Date endTime;
    
    @ApiModelProperty("用户姓名")
    private String realName;
    
}
