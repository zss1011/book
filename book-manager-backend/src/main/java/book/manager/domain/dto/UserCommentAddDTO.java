package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/12/9
 * @desc:
 */
@Data
@ApiModel("用户评论AddDTO")
public class UserCommentAddDTO {
    
    @ApiModelProperty("用户id")
    @NotBlank(message = "用户id不能为空")
    private String userId;
    
    @ApiModelProperty("业务数据id")
    private String businessId;
    
    @ApiModelProperty("是否匿名:1是 0否")
    private Integer anonymous;
    
    @ApiModelProperty("评论")
    @NotBlank(message = "评论不能为空")
    private String comment;
    
    @ApiModelProperty("被回复用户id")
    private String toUserId;
    
    @ApiModelProperty("父评论id")
    private String parentId;
    
}
