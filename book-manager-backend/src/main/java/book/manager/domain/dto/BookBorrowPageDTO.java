package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2026/1/2
 * @desc: 管理员端:用户借阅记录PageDTO
 */
@Data
@ApiModel("管理员端:用户借阅记录PageDTO")
public class BookBorrowPageDTO extends PageDTO {
    
    @ApiModelProperty("开始时间")
    private Date startTime;
    
    @ApiModelProperty("结束时间")
    private Date endTime;
    
}
