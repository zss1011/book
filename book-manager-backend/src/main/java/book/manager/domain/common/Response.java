package book.manager.domain.common;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

/**
 * @author: zss
 * @date: 2023/4/23
 * @desc: 统一结果返回类
 */
@Data
@ApiModel(description = "统一结果返回类")
public class Response<T> {
    
    @ApiModelProperty("状态码")
    protected Integer code;
    @ApiModelProperty("处理结果:true成功 false失败")
    protected boolean success;
    @ApiModelProperty("返回消息")
    protected String message;
    @ApiModelProperty("返回结果")
    protected T data;
    
    private Response() {
    }
    
    public static <T> Response<T> ok() {
        Response<T> response = new Response<>();
        response.setCode(200);
        response.setSuccess(true);
        response.setMessage("请求成功");
        return response;
    }
    
    public static <T> Response<T> ok(T data) {
        Response<T> response = new Response<>();
        response.setCode(200);
        response.setSuccess(true);
        response.setMessage("请求成功");
        response.setData(data);
        return response;
    }
    
    public static <T> Response<T> ok(T data, String message) {
        Response<T> response = new Response<>();
        response.setCode(200);
        response.setSuccess(true);
        response.setMessage(message);
        response.setData(data);
        return response;
    }
    
    public static <T> Response<T> ok(T data, Integer code, String message) {
        Response<T> response = new Response<>();
        response.setCode(code);
        response.setSuccess(true);
        response.setMessage(message);
        response.setData(data);
        return response;
    }
    
    public static <T> Response<T> fail() {
        Response<T> response = new Response<>();
        response.setCode(-200);
        response.setSuccess(false);
        response.setMessage("请求失败");
        return response;
    }
    
    public static <T> Response<T> fail(T data) {
        Response<T> response = new Response<>();
        response.setCode(-200);
        response.setSuccess(false);
        response.setMessage("请求失败");
        response.setData(data);
        return response;
    }
    
    public static <T> Response<T> fail(String message) {
        Response<T> response = new Response<>();
        response.setCode(-1);
        response.setSuccess(false);
        response.setMessage(message);
        response.setData(null);
        return response;
    }
    
    public static <T> Response<T> fail(T data, String message) {
        Response<T> response = new Response<>();
        response.setCode(-1);
        response.setSuccess(false);
        response.setMessage(message);
        response.setData(data);
        return response;
    }
    
    public static <T> Response<T> fail(T data, Integer code, String message) {
        Response<T> response = new Response<>();
        response.setCode(code);
        response.setSuccess(false);
        response.setMessage(message);
        response.setData(data);
        return response;
    }
    
    public static <T> Response<T> message(boolean success, String message) {
        Response<T> response = new Response<>();
        if (success) {
            response.setCode(200);
            response.setSuccess(true);
        } else {
            response.setCode(-1);
            response.setSuccess(false);
        }
        response.setMessage(message);
        return response;
    }
    
}