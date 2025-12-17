package book.manager.domain.common;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2024/12/4
 * @desc:
 */
@Data
public class BaseVO {
    
    @ApiModelProperty("创建时间")
    private Date createTime;
    
    @ApiModelProperty("更新时间")
    private Date updateTime;
    
}
