package book.manager.utils;

import java.util.UUID;

/**
 * @author: zss
 * @date: 2023/5/30
 * @desc: UUID工具类
 */
public class UuidUtil {

    /**
     * 生成uuid，不带"-"
     *
     * @return
     */
    public static String generate() {
        return UUID.randomUUID().toString().replaceAll("-", "");
    }

}
