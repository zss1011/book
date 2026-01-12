package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/19
 * @desc: 用户书籍订阅PageVO
 */
@Data
@ApiModel("用户书籍订阅PageVO")
public class UserBookSubscriptionPageVO {
    
    @ApiModelProperty("id")
    private String id;
    
    @ApiModelProperty("书籍id")
    private String bookId;
    
    @ApiModelProperty("订阅者id")
    private String subscriptionUserId;
    
    @ApiModelProperty("订阅者姓名")
    private String subscriptionRealName;
    
    @ApiModelProperty("书籍名")
    private String bookName;
    
    @ApiModelProperty("作者")
    private String author;
    
    @ApiModelProperty("馆藏数")
    private Integer number;
    
    @ApiModelProperty("书籍所在")
    private String bookrack;
    
    @ApiModelProperty("创建日期")
    private Date createTime;
    
}
