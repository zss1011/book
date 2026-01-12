package book.manager.domain.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.math.BigDecimal;

/**
 * @author: zss
 * @date: 2026/1/12
 * @desc: 书籍情况统计:预售、上架、借阅、收藏VO
 */
@Data
@ApiModel("书籍情况统计:预售、上架、借阅、收藏VO")
public class BookStatBaseInfoVO {
    
    @ApiModelProperty("名称")
    private String name;
    
    @ApiModelProperty("数值")
    private BigDecimal value;
    
}
