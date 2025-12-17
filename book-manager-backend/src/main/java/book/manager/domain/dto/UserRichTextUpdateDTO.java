package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/11/26
 * @desc: 用户富文本表UpdateDTO
 */
@Data
@ApiModel("用户富文本表UpdateDTO")
public class UserRichTextUpdateDTO {
    
    @ApiModelProperty("id")
    @NotBlank(message = "id不能为空")
    private String id;
    
    @ApiModelProperty("标题")
    private String title;
    
    @ApiModelProperty("富文本内容")
    @NotBlank(message = "富文本内容不能为空")
    private String content;
    
}
