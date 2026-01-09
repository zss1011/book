package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/19
 * @desc: 用户书籍借阅PageVO
 */
@Data
@ApiModel("用户书籍借阅PageVO")
public class BookBorrowPageVO {
    
    @ApiModelProperty("id")
    private String id;
    
    @ApiModelProperty("书籍id")
    private String bookId;
    
    @ApiModelProperty("书籍名")
    private String bookName;
    
    @ApiModelProperty("作者")
    private String author;
    
    @ApiModelProperty("馆藏数")
    private Integer number;
    
    @ApiModelProperty("借阅者id")
    private String borrowUserId;
    
    @ApiModelProperty("借阅者姓名")
    private String borrowRealName;
    
    @ApiModelProperty("借阅日期")
    private Date borrowDate;
    
    @ApiModelProperty("是否归还:true是 false否")
    private Boolean returnStatus;
    
    @ApiModelProperty("归还日期")
    private Date returnTime;
    
}
