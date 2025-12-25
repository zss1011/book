package book.manager.domain.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

/**
 * @author: zss
 * @date: 2025/12/17
 * @desc: 用户书籍订阅DTO
 */
@Data
@ApiModel("用户书籍操作DTO")
public class UserBookOperationDTO {
    
    @ApiModelProperty("用户id")
    @NotBlank
    private String userId;
    
    @ApiModelProperty("书籍id")
    @NotBlank
    private String bookId;
    
    @ApiModelProperty("操作:true是 false否")
    @NotNull
    private Boolean operation;
    
    @ApiModelProperty("类型:1订阅 2收藏 3借阅")
    @NotNull
    private Integer type;
    
    @ApiModelProperty("借阅数量")
    private Integer borrowCount;
    
    @ApiModelProperty("归还日期")
    private Date returnTime;
    
}
