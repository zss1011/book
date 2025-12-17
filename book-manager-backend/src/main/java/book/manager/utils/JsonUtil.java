package book.manager.utils;


import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * @author: zss
 * @date: 2024/1/30
 * @desc: json工具类
 */
public class JsonUtil {

    private static final ObjectMapper INSTANCE = new ObjectMapper();

    static {
        // 设置Date的序列化与反序列化
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        INSTANCE.setDateFormat(dateFormat);

        // 设置LocalDateTime的序列化与反序列化
        JavaTimeModule javaTimeModule = new JavaTimeModule();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        javaTimeModule.addSerializer(LocalDateTime.class, new LocalDateTimeSerializer(dateTimeFormatter));
        javaTimeModule.addDeserializer(LocalDateTime.class, new LocalDateTimeDeserializer(dateTimeFormatter));
        INSTANCE.registerModule(javaTimeModule);
        INSTANCE.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        INSTANCE.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);

        INSTANCE.findAndRegisterModules();
    }

    private JsonUtil() {
    }

    public static ObjectMapper getInstance() {
        return INSTANCE;
    }

    /**
     * 对象->json字符串
     *
     * @param obj
     * @return
     */
    public static String toJSONString(Object obj) {
        try {
            return INSTANCE.writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException("序列化json失败");
        }
    }

    /**
     * json字符串->对象
     *
     * @param text
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> T parseObject(String text, Class<T> clazz) {
        try {
            return INSTANCE.readValue(text, clazz);
        } catch (Exception e) {
            throw new RuntimeException("反序列化失败:" + text);
        }
    }

    /**
     * json字符串->对象List
     *
     * @param text
     * @param clazz
     * @param <T>
     * @return
     */
    public static <T> List<T> parseArray(String text, Class<T> clazz) {
        try {
            return INSTANCE.readValue(text, INSTANCE.getTypeFactory().constructCollectionType(List.class, clazz));
        } catch (Exception e) {
            throw new RuntimeException("反序列化失败:" + text);
        }
    }
}
