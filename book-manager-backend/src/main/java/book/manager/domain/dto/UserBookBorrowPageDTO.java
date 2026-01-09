package book.manager.domain.dto;

import book.manager.domain.common.PageDTO;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/12/18
 * @desc: 用户书籍关系PageDTO
 */
@Data
@ApiModel("用户书籍关系PageDTO")
public class UserBookBorrowPageDTO extends PageDTO {
    
    @ApiModelProperty("用户id")
    @NotBlank
    private String userId;
    
    @ApiModelProperty("书籍名")
    private String bookName;
    
}
