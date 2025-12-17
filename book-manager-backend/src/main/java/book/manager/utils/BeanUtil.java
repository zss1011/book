package book.manager.utils;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.beans.BeanUtils;

import java.util.List;
import java.util.stream.Collectors;

/**
 * @author: zss
 * @date: 2023/4/23
 * @desc:
 */
public class BeanUtil {

    public static <T> T copyProperties(Object source, Class<T> targetClass) {
        if (source == null) {
            throw new RuntimeException("BeanUtil.copyProperties:source不能为空");
        }

        try {
            T t = targetClass.newInstance();
            BeanUtils.copyProperties(source, t);
            return t;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public static <T> List<T> copyProperties(List<?> source, Class<T> targetClass) {
        return source.stream()
                .map(s -> copyProperties(s, targetClass))
                .collect(Collectors.toList());
    }

    public static <T, E> Page<T> copyProperties(Page<E> page, Class<T> targetClass) {
        Page<T> newPage = new Page<>();
        BeanUtils.copyProperties(page, newPage);
        List<E> records = page.getRecords();
        List<T> targetRecords = copyProperties(records, targetClass);
        newPage.setRecords(targetRecords);
        return newPage;
    }

}
