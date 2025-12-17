package book.manager.utils;

import org.apache.commons.collections4.CollectionUtils;

import java.util.Collection;

/**
 * @author: zss
 * @date: 2024/12/4
 * @desc: 集合工具类
 */
public class CollUtil {
    
    /**
     * 集合为null或空
     *
     * @param collection
     * @return
     */
    public static boolean isEmpty(Collection<?> collection) {
        return CollectionUtils.isEmpty(collection);
    }
    
    /**
     * 集合非null非空
     *
     * @param collection
     * @return
     */
    public static boolean isNotEmpty(Collection<?> collection) {
        return !isEmpty(collection);
    }
    
}
