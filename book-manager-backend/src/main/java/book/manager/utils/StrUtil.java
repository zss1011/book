package book.manager.utils;

import org.apache.commons.lang3.StringUtils;

/**
 * @author: zss
 * @date: 2024/12/4
 * @desc:
 */
public class StrUtil {
    
    /**
     * 字符串:str == null || str.trim() == ""
     *
     * @param str
     * @return
     */
    public static boolean isBlank(String str) {
        
        return StringUtils.isBlank(str);
    }
    
    /**
     * 字符串:str != null && str.trim() != ""
     *
     * @param str
     * @return
     */
    public static boolean isNotBlank(String str) {
        return !isBlank(str);
    }
    
    /**
     * 字符串是否相等
     *
     * @param str1
     * @param str2
     * @return
     */
    public static boolean equals(String str1, String str2) {
        return StringUtils.equals(str1, str2);
    }
    
    /**
     * 字符串是否相等,忽略大小写
     *
     * @param str1
     * @param str2
     * @return
     */
    public static boolean equalsIgnoreCase(String str1, String str2) {
        return StringUtils.equalsIgnoreCase(str1, str2);
    }
    
    /**
     * 字符串是否不相等
     *
     * @param str1
     * @param str2
     * @return
     */
    public static boolean notEquals(String str1, String str2) {
        return !equals(str1, str2);
    }
    
    /**
     * 字符串是否不相等,忽略大小写
     *
     * @param str1
     * @param str2
     * @return
     */
    public static boolean notEqualsIgnoreCase(String str1, String str2) {
        return !StringUtils.equalsIgnoreCase(str1, str2);
    }
    
}
