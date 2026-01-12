package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2026/1/12
 * @desc: 管理员分页查询:用户已订阅书籍PageDTO
 */
@Data
@ApiModel("管理员分页查询:用户已订阅书籍PageDTO")
public class AdminUserBookSubscriptionPageDTO extends PageDTO {
    
    @ApiModelProperty("书籍名称")
    private String bookName;
    
    @ApiModelProperty("开始时间")
    private Date startTime;
    
    @ApiModelProperty("截止时间")
    private Date endTime;
}
