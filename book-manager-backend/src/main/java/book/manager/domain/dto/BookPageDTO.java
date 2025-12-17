package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: zss
 * @date: 2025/9/2
 * @desc: 书籍PageDTO
 */
@Data
@ApiModel(value = "书籍PageDTO", description = "书籍PageDTO")
public class BookPageDTO extends PageDTO {
    
    @ApiModelProperty("书籍名")
    private String bookName;
    
    @ApiModelProperty("书籍类别")
    private String bookType;
    
}
