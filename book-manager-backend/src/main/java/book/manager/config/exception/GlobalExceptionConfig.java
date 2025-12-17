package book.manager.config.exception;

import book.manager.domain.common.Response;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * @author: zss
 * @date: 2023/12/6
 * @desc: 全局异常处理
 */
@Slf4j
@RestControllerAdvice({"book.manager"})
public class GlobalExceptionConfig {
    
    @ExceptionHandler(Exception.class)
    public Response<String> exceptionHandler(Exception e) {
        log.error("Exception:{}", e.getMessage(), e);
        return Response.fail(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    public Response<String> runtimeExceptionHandler(RuntimeException e) {
        log.error("Exception:{}", e.getMessage(), e);
        return Response.fail(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Response<String> methodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        log.error("MethodArgumentNotValidException:{}", e.getMessage(), e);
        String message = e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return Response.fail("请求参数错误，" + message);
    }

}
