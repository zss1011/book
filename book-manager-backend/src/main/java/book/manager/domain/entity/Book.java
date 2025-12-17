package book.manager.domain.entity;

import book.manager.domain.common.BaseUUID;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * <p>
 * 书籍表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-09-02
 */
@Data
@TableName("book")
@ApiModel(value = "Book对象", description = "书籍表")
public class Book extends BaseUUID implements Serializable {
    
    private static final long serialVersionUID = 1L;
    
    @ApiModelProperty("书籍名称")
    private String name;
    
    @ApiModelProperty("出版商")
    private String publishers;
    
    @ApiModelProperty("作者")
    private String author;
    
    @ApiModelProperty("书号")
    private String bookNo;
    
    @ApiModelProperty("书籍简介")
    private String bookInfo;
    
    @ApiModelProperty("书架")
    private String bookrack;
    
    @ApiModelProperty("书籍类别")
    private String type;
    
    @ApiModelProperty("书籍数量")
    private Integer number;
    
    @ApiModelProperty("书籍封面")
    private String cover;
    
    @ApiModelProperty("书籍状态:1预售 2上架 3下架")
    private Integer status;
    
    @ApiModelProperty("上架时间")
    private Date addedDate;
    
}
