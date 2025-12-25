package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: zss
 * @date: 2025/9/2
 * @desc: 书籍PageVO
 */
@Data
@ApiModel(value = "书籍PageVO", description = "书籍PageVO")
public class BookPageVO {
    
    @ApiModelProperty("书籍id")
    private String id;
    
    @ApiModelProperty("书籍名称")
    private String name;
    
    @ApiModelProperty("书籍状态:1预售 2上架 3下架")
    private Integer status;
    
    @ApiModelProperty("书籍类别")
    private String type;
    
    @ApiModelProperty("书籍简介")
    private String bookInfo;
    
    @ApiModelProperty("作者")
    private String author;
    
    @ApiModelProperty("书籍数量")
    private Integer number;
    
    @ApiModelProperty("书籍封面")
    private String cover;
    
    @ApiModelProperty("出版商")
    private String publishers;
    
    @ApiModelProperty("订阅状态:true是 false否")
    private Boolean subscriptionStatus;
    
    @ApiModelProperty("收藏状态:true是 false否")
    private Boolean collectStatus;
    
    @ApiModelProperty("借阅状态:true是 false否")
    private Boolean borrowStatus;
    
}
