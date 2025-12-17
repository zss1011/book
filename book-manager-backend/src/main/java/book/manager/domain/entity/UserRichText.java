package book.manager.domain.entity;

import book.manager.domain.common.BaseUUID;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.time.LocalDateTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * <p>
 * 用户富文本表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-11-26
 */
@Data
@TableName("user_rich_text")
@ApiModel(value = "UserRichText对象", description = "用户富文本表")
public class UserRichText extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("创建者userId")
    private String userId;

    @ApiModelProperty("创建者username")
    private String username;

    @ApiModelProperty("创建者姓名")
    private String realName;
    
    @ApiModelProperty("标题")
    private String title;

    @ApiModelProperty("富文本内容")
    private String content;
    
}
