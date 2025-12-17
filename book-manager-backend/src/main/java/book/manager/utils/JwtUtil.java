package book.manager.utils;

import io.jsonwebtoken.*;

import java.util.Date;
import java.util.Map;

/**
 * @author: zss
 * @date: 2023/10/24
 * @desc: JwtUtil
 */
public class JwtUtil {

    public static final String key = "asfjaskl34953408sfksadl3058304850803284asfjaskl34953408sfksadl3058304850803284";

    public static String createJwtToken(Map<String, Object> map) {
        try {
            // token生效日期
            map.put("startTime", DateUtil.format(new Date(), "yyyy-MM-dd HH:mm:ss"));
            // token失效日期
            map.put("endTime", DateUtil.format(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 365), "yyyy-MM-dd HH:mm:ss"));

            return Jwts.builder()
                    // header
                    .setHeaderParam("alg", "HS256")
                    // payload
                    .addClaims(map)
                    // signature
                    .signWith(SignatureAlgorithm.HS256, key)
                    .compact();
        } catch (Exception e) {
            throw new SecurityException("create jwt token fail");
        }
    }


    @SuppressWarnings("all")
    public static Map<String, Object> parseJwtToken(String jwtToken) {
        try {
            JwtParser build = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build();
            Jwt parse = build.parse(jwtToken);
            Header header = parse.getHeader();
            Map<String, Object> payload = (Map<String, Object>) parse.getBody();
            return payload;
        } catch (Exception e) {
            throw new SecurityException("parse jwt token failure");
        }
    }
}
