package book.manager.domain.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.Date;

/**
 * @author: zss
 * @date: 2025/11/14
 * @desc:
 */
@Data
public class Test04DTO {
    
    @ApiModelProperty("用户id")
    @NotBlank(message = "用户id不能为空")
    private String realName;
    
    private Date startTime;
    
    private Date endTime;
    
}
