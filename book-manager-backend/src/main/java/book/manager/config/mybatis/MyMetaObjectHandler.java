package book.manager.config.mybatis;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

/**
 * @author: zss
 * @date: 2023/4/23
 * @desc: mybatis-plus自动填充日期
 */
@Component
public class MyMetaObjectHandler implements MetaObjectHandler {
    
    @Override
    public void insertFill(MetaObject metaObject) {
        TimeZone timeZone = TimeZone.getTimeZone("GMT+8"); // 明确时区
        Calendar calendar = Calendar.getInstance(timeZone);
        Date now = calendar.getTime();
        
        boolean createTime = metaObject.hasSetter("createTime");
        if (createTime) {
            this.strictInsertFill(metaObject, "createTime", Date.class, now);
        }
        boolean updateTime = metaObject.hasSetter(("updateTime"));
        if (updateTime) {
            this.strictInsertFill(metaObject, "updateTime", Date.class, now);
        }
    }
    
    @Override
    public void updateFill(MetaObject metaObject) {
        TimeZone timeZone = TimeZone.getTimeZone("GMT+8"); // 明确时区
        Calendar calendar = Calendar.getInstance(timeZone);
        Date now = calendar.getTime();
        
        boolean updateTime = metaObject.hasSetter(("updateTime"));
        if (updateTime) {
            this.strictUpdateFill(metaObject, "updateTime", Date.class, now);
        }
    }
}
