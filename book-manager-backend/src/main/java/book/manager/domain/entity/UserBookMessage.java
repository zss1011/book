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
 * 用户书籍消息表
 * </p>
 *
 * @author mybatis-plus
 * @since 2026-01-01
 */
@Data
@TableName("user_book_message")
@ApiModel(value = "UserBookMessage对象", description = "用户书籍消息表")
public class UserBookMessage extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty("用户id")
    private String userId;

    @ApiModelProperty("书籍id")
    private String bookId;

    @ApiModelProperty("书籍消息")
    private String message;

    @ApiModelProperty("消息阅读状态:1是 0否")
    private Integer readStatus;
    
}
