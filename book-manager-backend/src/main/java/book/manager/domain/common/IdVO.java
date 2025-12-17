package book.manager.domain.common;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/11/28
 * @desc:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IdVO {
    
    @ApiModelProperty("id")
    private String id;
    
}
