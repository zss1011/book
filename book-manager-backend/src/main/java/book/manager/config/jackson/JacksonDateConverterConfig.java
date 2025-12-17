package book.manager.config.jackson;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.Jackson2ObjectMapperFactoryBean;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

/**
 * @author: zss
 * @date: 2023/4/23
 * @desc: 前后端交互，日期数据转换
 */
@Configuration
public class JacksonDateConverterConfig {
    
    @Bean
    public Jackson2ObjectMapperFactoryBean jackson2ObjectMapperFactoryBean() {
        Jackson2ObjectMapperFactoryBean factoryBean = new Jackson2ObjectMapperFactoryBean();
        // 可支持多个
        factoryBean.setSerializers(new Date2StringConverter(), new LocalDate2StringConverter());
        factoryBean.setDeserializers(new String2DateConverter(), new String2LocalDateTimeConverter());
        return factoryBean;
    }
    
    /**
     * 自定义：Jackson的String -> Date
     */
    public static class String2DateConverter extends JsonDeserializer<Date> {
        
        @Override
        public Date deserialize(JsonParser jsonParser, DeserializationContext context) {
            String text = null;
            try {
                text = jsonParser.getText();
                if (text.trim().length() == 19) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                    return sdf.parse(text);
                } else if (text.trim().length() == 10) {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    return sdf.parse(text);
                }
            } catch (Exception e) {
                throw new RuntimeException("text:" + text + " -> Date 失败");
            }
            throw new RuntimeException("text:" + text + " -> Date 失败");
        }
        
        @Override
        public Class<?> handledType() {
            return Date.class;
        }
    }
    
    /**
     * 自定义: Jackson的Date -> String
     */
    public static class Date2StringConverter extends JsonSerializer<Date> {
        @Override
        public void serialize(Date date, JsonGenerator jsonGenerator, SerializerProvider serializers) throws IOException {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            jsonGenerator.writeString(sdf.format(date));
        }
        
        @Override
        public Class<Date> handledType() {
            return Date.class;
        }
    }
    
    /**
     * 自定义: Jackson的LocalDateTime -> String
     */
    public static class LocalDate2StringConverter extends JsonSerializer<LocalDateTime> {
        
        private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        
        @Override
        public void serialize(LocalDateTime localDateTime, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            // 将 LocalDateTime 格式化为字符串
            String formattedDate = localDateTime.format(FORMATTER);
            // 将格式化后的日期写入 JSON 输出
            jsonGenerator.writeString(formattedDate);
        }
        
        @Override
        public Class<LocalDateTime> handledType() {
            return LocalDateTime.class;
        }
    }
    
    
    /**
     * 自定义: Jackson的String -> LocalDateTime
     */
    public static class String2LocalDateTimeConverter extends JsonDeserializer<LocalDateTime> {
        
        @Override
        public LocalDateTime deserialize(JsonParser jsonParser, DeserializationContext context) throws IOException, JsonProcessingException {
            String text = jsonParser.getText();
            if (StringUtils.isNotBlank(text)) {
                // 可适配多种时间格式
                DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                return LocalDateTime.parse(text, dtf);
            }
            return null;
        }
        
        @Override
        public Class<?> handledType() {
            return LocalDateTime.class;
        }
    }
    
}
