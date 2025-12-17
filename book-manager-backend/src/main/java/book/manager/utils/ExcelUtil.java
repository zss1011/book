package book.manager.utils;

import cn.hutool.poi.excel.ExcelReader;
import com.alibaba.excel.EasyExcel;
import com.alibaba.excel.read.listener.PageReadListener;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.net.URLEncoder;
import java.util.*;

/**
 * @author: zss
 * @date: 2022/11/25
 * @desc: excel工具类
 */
public class ExcelUtil {

    /**
     * 导出excel
     *
     * @param clazz     excel对象
     * @param data      excel对象数据
     * @param excelName 文件名
     * @param sheetName *
     * @param response  *
     * @throws Exception *
     */
    public static void export(Class<?> clazz, List<?> data, String excelName, String sheetName, HttpServletResponse response) throws Exception {
        ServletOutputStream outputStream = null;
        try {
            // 官方是这样设置ContentType
            // response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            response.setContentType("application/octet-stream");
            response.setCharacterEncoding("UTF-8");
            String fileName = URLEncoder.encode(excelName, "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
            outputStream = response.getOutputStream();
            EasyExcel.write(outputStream, clazz).sheet(sheetName).doWrite(data);
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }

    /**
     * 读取excel
     *
     * @param inputStream
     * @param clazz
     */
    public static <E> List<E> read(InputStream inputStream, Class<E> clazz) {
        List<E> list = new ArrayList<>();
        EasyExcel.read(inputStream, clazz, new PageReadListener<>(data -> list.addAll((List) data))).sheet().doRead();
        return list;
    }

    /**
     * 读取excel
     *
     * @param file
     * @param clazz
     */
    public static <E> List<E> read(File file, Class<E> clazz) {
        List<E> list = new ArrayList<>();
        EasyExcel.read(file, clazz, new PageReadListener<>(data -> list.addAll((List) data))).sheet().doRead();
        return list;
    }

    /**
     * 使用hutool读取excel
     *
     * @param inputStream
     * @return
     */
    public static List<Map<String, String>> read(InputStream inputStream) {
        ExcelReader reader = cn.hutool.poi.excel.ExcelUtil.getReader(inputStream);
        // 读取第一页
        reader.setSheet(0);
        List<Map<String, Object>> maps = reader.readAll();
        reader.close();
        
        // 全部转String
        List<Map<String, String>> list = new ArrayList<>();
        for (Map<String, Object> map : maps) {
            Set<Map.Entry<String, Object>> entries = map.entrySet();
            Map<String, String> data = new HashMap<>();
            for (Map.Entry<String, Object> entry : entries) {
                data.put(entry.getKey(), entry.getValue() != null ? entry.getValue().toString() : null);
            }
            list.add(data);
        }
        return list;
    }

}










