package book.manager.domain.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * @author: zss
 * @date: 2022/10/17
 * @desc: 分页查询DTO
 */
@Data
@ApiModel(value = "分页查询DTO", description = "分页查询DTO")
public class PageDTO {

    @ApiModelProperty(value = "页码(不能为空)", example = "1", required = true)
    @NotNull(message = "分页参数不能为空")
    @Min(value = 1, message = "当前页不能小于1")
    protected Integer current;

    @ApiModelProperty(value = "每页数量(不能为空)", example = "10", required = true)
    @NotNull(message = "每页数量不能为空")
    @Max(value = 1000000, message = "每页最大为1000000")
    @Min(value = 1, message = "每页最小为1")
    protected Integer size;

}