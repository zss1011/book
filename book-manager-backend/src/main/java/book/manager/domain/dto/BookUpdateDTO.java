package book.manager.domain.dto;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @author: zss
 * @date: 2025/10/29
 * @desc: 书籍UpdateDTO
 */
@Data
@ApiModel(value = "书籍UpdateDTO", description = "书籍UpdateDTO")
public class BookUpdateDTO {
    
    @ApiModelProperty("主键id")
    @NotBlank(message = "id不能为空")
    private String id;
    
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
    
    @ApiModelProperty("创建时间")
    private Date createTime;
    
    @ApiModelProperty("更新时间")
    private Date updateTime;
    
}
