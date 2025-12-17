package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/1
 * @desc: 富文本PageDTO
 */
@Data
@ApiModel("富文本PageDTO")
public class RichTextPageDTO extends PageDTO {

    @ApiModelProperty("标题")
    private String title;
    
    @ApiModelProperty("开始时间")
    private Date startTime;
    
    @ApiModelProperty("结束时间")
    private Date endTime;

}
