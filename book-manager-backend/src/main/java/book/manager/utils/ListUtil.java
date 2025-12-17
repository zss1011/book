package book.manager.utils;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.google.common.collect.Lists;

import java.text.Collator;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

/**
 * @author: zss
 * @date: 2023/5/31
 * @desc: List工具类
 */
public class ListUtil {
    
    /**
     * 创建arrayList
     *
     * @param elements
     * @param <E>
     * @return
     */
    @SuppressWarnings("all")
    public static <E> List<E> newArrayList(E... elements) {
        return Lists.newArrayList(elements);
    }
    
    /**
     * list分页
     */
    public static <E> List<E> listPage(List<E> list, int current, int size) {
        if (list == null || list.isEmpty() || size <= 0) {
            return new ArrayList<>(); // 返回一个空列表
        }
        
        int fromIndex = (current - 1) * size;
        if (fromIndex >= list.size()) {
            return new ArrayList<>(); // 请求的页码超出实际页数，返回空列表
        }
        
        int toIndex = Math.min(fromIndex + size, list.size());
        return new ArrayList<>(list.subList(fromIndex, toIndex));
    }
    
    /**
     * 根据T中的属性去重
     *
     * @param list
     * @param function
     * @param <T>
     * @param <R>
     * @return
     */
    public static <T, R> List<T> distinctByKey(List<T> list, Function<T, R> function) {
        List<T> result = new ArrayList<>();
        Set<R> seen = new HashSet<>();
        for (T item : list) {
            R key = function.apply(item);
            if (seen.add(key)) {
                result.add(item);
            }
        }
        return result;
    }
    
    /**
     * 将List按照length分成多个subList: [1, 2, 3, 4, 5] --> [[1, 2], [3, 4], [5]]
     *
     * @param list
     * @param length
     * @param <T>
     * @return
     */
    public static <T> List<List<T>> split(List<T> list, int length) {
        List<List<T>> result = new ArrayList<>();
        if (length >= list.size()) {
            result.add(list);
            return result;
        }
        List<T> list2 = new ArrayList<>();
        int count = 0;
        for (int i = 0; i < list.size(); i++) {
            list2.add(list.get(i));
            if ((i + 1) % length == 0) {
                result.add(list2);
                list2 = new ArrayList<>();
                count++;
            }
        }
        int end = count * length;
        int count2 = list.size() - end;
        List<T> list3 = new ArrayList<>();
        if (count2 > 0) {
            for (int i = list.size() - 1; i < list.size(); i--) {
                list3.add(list.get(i));
                count2 = --count2;
                if (count2 == 0) {
                    break;
                }
            }
        }
        if (!list3.isEmpty()) {
            List<T> list4 = new ArrayList<>();
            for (int i = list3.size() - 1; i < list3.size() && i >= 0; i--) {
                list4.add(list3.get(i));
            }
            result.add(list4);
        }
        return result;
    }
    
    /**
     * 构建Page
     */
    public static <T> Page<T> buildPage(List<T> list, long current, long size, long total) {
        Page<T> page = new Page<>();
        page.setCurrent(current);
        page.setSize(size);
        page.setRecords(list);
        page.setTotal(total);
        return page;
    }
    
    public static <T> Page<T> buildPage(List<T> list, int current, int size) {
        int total = list.size();
        List<T> newList = listPage(list, current, size);
        
        Page<T> page = new Page<>();
        page.setCurrent(current);
        page.setSize(size);
        page.setRecords(newList);
        page.setTotal(total);
        return page;
    }
    
    /**
     * 两个List元素是否有交集
     *
     * @param list1
     * @param list2
     * @return
     */
    public static boolean haveCommon(List<?> list1, List<?> list2) {
        Set<Object> set = new HashSet<>(list1);
        for (Object element : list2) {
            if (set.contains(element)) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * 获取两个List中的相同元素
     *
     * @param list1
     * @param list2
     * @return
     */
    public static List<?> common(List<?> list1, List<?> list2) {
        List<Object> common = new ArrayList<>();
        Set<Object> set = new HashSet<>(list1);
        for (Object element : list2) {
            if (set.contains(element)) {
                common.add(element);
            }
        }
        return common;
    }
    
    /**
     * 两个数组元素是否有交集
     *
     * @param array1
     * @param array2
     * @return
     */
    public static <T> boolean haveCommon(T[] array1, T[] array2) {
        Set<T> set = new HashSet<>(Arrays.asList(array1));
        
        for (T element : array2) {
            if (set.contains(element)) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * 两个数组中的相同元素
     *
     * @param array1
     * @param array2
     * @param <T>
     * @return
     */
    public static <T> List<?> common(T[] array1, T[] array2) {
        List<T> list1 = Lists.newArrayList(array1);
        List<T> list2 = Lists.newArrayList(array2);
        List<Object> common = new ArrayList<>();
        Set<Object> set = new HashSet<>(list1);
        for (Object element : list2) {
            if (set.contains(element)) {
                common.add(element);
            }
        }
        return common;
    }
    
    /**
     * 两个List元素是否有不同值
     *
     * @param list1
     * @param list2
     * @param <T>
     * @return
     */
    public static <T> boolean haveDifferent(List<T> list1, List<T> list2) {
        List<T> onlyInList1 = list1.stream()
                .filter(element -> !list2.contains(element))
                .collect(Collectors.toList());
        
        List<T> onlyInList2 = list2.stream()
                .filter(element -> !list1.contains(element))
                .collect(Collectors.toList());
        
        // 如果任意一个列表有不同的元素，返回 true
        return !onlyInList1.isEmpty() || !onlyInList2.isEmpty();
    }
    
    /**
     * list倒序排序
     *
     * @param list
     * @param function
     * @param <T>
     * @param <R>
     */
    public static <T, R extends Comparable<? super R>> List<T> reverseOrder(List<T> list, Function<T, R> function) {
        // 创建一个新的列表副本，以避免修改原始列表
        List<T> sortedList = new ArrayList<>(list);
        // 对副本进行排序
        sortedList.sort(Comparator.comparing(function, Comparator.nullsLast(Comparator.reverseOrder())));
        // 返回排序后的副本
        return sortedList;
    }

    /**
     * list正序排序
     *
     * @param list
     * @param function
     * @param <T>
     * @param <R>
     * @return
     */
    public static <T, R extends Comparable<? super R>> List<T> naturalOrder(List<T> list, Function<T, R> function) {
        // 创建一个新的列表副本，以避免修改原始列表
        List<T> sortedList = new ArrayList<>(list);
        // 对副本进行排序
        sortedList.sort(Comparator.comparing(function, Comparator.nullsLast(Comparator.naturalOrder())));
        // 返回排序后的副本
        return sortedList;
    }
    
    
}
