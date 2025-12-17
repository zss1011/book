package book.manager.domain.dto;

import book.manager.utils.JsonUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @author: zss
 * @date: 2025/9/2
 * @desc: 书籍AddDTO
 */
@Data
@ApiModel(value = "书籍AddDTO", description = "书籍AddDTO")
public class BookAddDTO {
    
    @ApiModelProperty("书籍名称")
    @NotBlank(message = "书籍名称不能为空")
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
    @NotBlank(message = "书架不能为空")
    private String bookrack;
    
    @ApiModelProperty("书籍类别")
    @NotBlank(message = "书籍类别不能为空")
    private String type;
    
    @ApiModelProperty("书籍数量")
    private Integer number;
    
    @ApiModelProperty("书籍封面")
    private String cover;
    
    @ApiModelProperty("书籍状态:1预售 2上架 3下架")
    private Integer status;
    
    @ApiModelProperty("上架时间")
    private Date addedDate;
    
    public static void main(String[] args) {
        BookAddDTO addDTO = new BookAddDTO();
        addDTO.setName("书籍名称");
        addDTO.setPublishers("出版商");
        addDTO.setAuthor("作者");
        addDTO.setBookNo("书号");
        addDTO.setBookInfo("书籍简介");
        addDTO.setBookrack("2楼-北区-A1");
        addDTO.setType("文学");
        addDTO.setNumber(10);
        addDTO.setCover("书籍封面");
        System.out.println(JsonUtil.toJSONString(addDTO));
    }
    
}
