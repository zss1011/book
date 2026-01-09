package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/19
 * @desc: 用户订阅的书籍上架通知PageVO
 */
@Data
@ApiModel("用户订阅的书籍上架通知PageVO")
public class SubscriptionBookAddedPageVO {
    
    @ApiModelProperty("id")
    private String id;
    
    @ApiModelProperty("书籍id")
    private String bookId;
    
    @ApiModelProperty("书籍名")
    private String bookName;
    
    @ApiModelProperty("消息")
    private String message;
    
    @ApiModelProperty("作者")
    private String author;
    
    @ApiModelProperty("消息阅读状态:1是 0否")
    private Integer readStatus;
    
    @ApiModelProperty("订阅日期")
    private Date subscriptionDate;
    
    @ApiModelProperty("上架日期")
    private Date addedDate;
    
    @ApiModelProperty("推送日期")
    private Date pushDate;
    
}
