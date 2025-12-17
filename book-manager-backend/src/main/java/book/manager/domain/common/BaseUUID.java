package book.manager.domain.common;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.util.Date;

/**
 * @author: zss
 * @date: 2024/6/3
 * @desc:
 */
@Data
public class BaseUUID {
    @ApiModelProperty("主键id")
    @TableId(type = IdType.ASSIGN_UUID)
    private String id;

    @ApiModelProperty("创建时间")
    @TableField(fill = FieldFill.INSERT)
    private Date createTime;

    @ApiModelProperty("更新时间")
    @TableField(fill = FieldFill.INSERT_UPDATE, update = "now()")
    private Date updateTime;

    @ApiModelProperty("逻辑删除:0正常 1删除")
    @TableLogic(value = "0", delval = "1")
    private Integer delFlag = 0;
}
