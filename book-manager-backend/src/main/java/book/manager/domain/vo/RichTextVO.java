package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: zss
 * @date: 2025/12/2
 * @desc: 富文本VO
 */
@Data
@ApiModel("富文本VO")
public class RichTextVO {
    
    @ApiModelProperty("id")
    private String id;
    
    @ApiModelProperty("标题")
    private String title;
    
    @ApiModelProperty("富文本内容")
    private String content;
    
}
