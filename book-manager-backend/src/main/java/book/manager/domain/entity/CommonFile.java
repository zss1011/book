package book.manager.domain.entity;

import book.manager.domain.common.BaseUUID;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Blob;
import java.time.LocalDateTime;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * <p>
 * 文件表
 * </p>
 *
 * @author mybatis-plus
 * @since 2025-09-30
 */
@Data
@TableName("common_file")
@ApiModel(value = "CommonFile对象", description = "文件表")
public class CommonFile extends BaseUUID implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @ApiModelProperty("文件名")
    private String fileName;

    @ApiModelProperty("文件二进制数据")
    private byte[] fileBinary;

    @ApiModelProperty("文件大小:MB")
    private BigDecimal fileSize;
    
}
