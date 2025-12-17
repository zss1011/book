package book.manager.domain.entity;

import book.manager.domain.common.BaseUUID;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.io.Serializable;

/**
 * <p>
 * 用户评论表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-12-09
 */
@Data
@TableName("user_comment")
@ApiModel(value = "UserComment对象", description = "用户评论表")
public class UserComment extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("用户id")
    private String userId;

    @ApiModelProperty("是否匿名:1是 0否")
    private Integer anonymous;

    @ApiModelProperty("评论")
    private String comment;

    @ApiModelProperty("点赞数")
    private Integer likes;

    @ApiModelProperty("点赞userIds")
    private String likeUserIds;

    @ApiModelProperty("被回复用户id")
    private String toUserId;

    @ApiModelProperty("父评论id")
    private String parentId;

    @ApiModelProperty("业务数据id")
    private String businessId;

    @ApiModelProperty("业务类型:1留言板 2..")
    private Integer type;
    
}
