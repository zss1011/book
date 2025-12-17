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
 * 用户书籍表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-12-17
 */
@Data
@TableName("user_book_relation")
@ApiModel(value = "UserBookRelation对象", description = "用户书籍表")
public class UserBookRelation extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("用户id")
    private String userId;

    @ApiModelProperty("书籍id")
    private String bookId;

    @ApiModelProperty("订阅状态:1是 0否")
    private Integer subscriptionStatus;

    @ApiModelProperty("收藏状态:1是 0否")
    private Integer collectStatus;

    @ApiModelProperty("借阅状态:1是 0否")
    private Integer borrowStatus;
    
}
