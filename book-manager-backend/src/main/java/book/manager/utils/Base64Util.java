package book.manager.utils;

import java.io.UnsupportedEncodingException;
import java.util.Base64;

/**
 * @author: zss
 * @date: 2023/9/19
 * @desc: Base64Util
 */
public class Base64Util {

    /**
     * base64编码
     */
    public static String encoder(String text) {
        try {
            Base64.Encoder encoder = Base64.getEncoder();
            return encoder.encodeToString(text.getBytes("UTF-8"));
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("base64编码失败", e);
        }
    }

    /**
     * base64解码
     */
    public static String decoder(String text) {
        try {
            Base64.Decoder decoder = Base64.getDecoder();
            return new String(decoder.decode(text), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("base64解码失败", e);
        }
    }

}
