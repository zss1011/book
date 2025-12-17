package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/1
 * @desc: 富文本PageVO
 */
@Data
@ApiModel("富文本PageVO")
public class RichTextPageVO {
    
    @ApiModelProperty("主键id")
    private String id;
    
    @ApiModelProperty("标题")
    private String title;
    
    @ApiModelProperty("创建时间")
    private Date createTime;
    
}
