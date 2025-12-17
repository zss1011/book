package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/10
 * @desc:
 */
@Data
@ApiModel("用户评论VO")
public class UserCommentVO {
    
    @ApiModelProperty("主键id")
    private String id;
    
    @ApiModelProperty("业务数据id")
    private String businessId;
    
    @ApiModelProperty("用户id")
    private String userId;
    
    @ApiModelProperty("用户姓名")
    private String realName;
    
    @ApiModelProperty("头像")
    private String avatar;
    
    @ApiModelProperty("是否匿名:1是 0否")
    private Integer anonymous;
    
    @ApiModelProperty("评论")
    private String comment;
    
    @ApiModelProperty("点赞数")
    private Integer likes;
    
    @ApiModelProperty("被回复用户id")
    private String toUserId;
    
    @ApiModelProperty("被回复用户姓名")
    private String toRealName;
    
    @ApiModelProperty("被评论用户头像")
    private String toAvatar;
    
    @ApiModelProperty("父评论id")
    private String parentId;
    
    @ApiModelProperty("创建时间")
    private Date createTime;
}
