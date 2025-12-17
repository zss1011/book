package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: zss
 * @date: 2025/12/11
 * @desc: 用户评论PageDTO
 */
@Data
@ApiModel("用户评论PageDTO")
public class UserCommentPageDTO extends PageDTO {
    
    @ApiModelProperty("关键词搜索")
    private String keyword;
    
    @ApiModelProperty("状态:1全部 2已回复 3未回复 4我的发布")
    private Integer status;
    
}
