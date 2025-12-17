package book.manager.controller;

import book.manager.dao.service.FileService;
import book.manager.domain.common.Response;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Base64;

/**
 * @author: zss
 * @date: 2025/9/25
 * @desc: 文件相关接口
 */
@Api(tags = "文件接口")
@RestController
@RequestMapping("/file/v1")
public class FileController {
    
    @Resource
    private FileService fileService;
    
    @ApiOperation("上传文件并返回Base64")
    @PostMapping("/toBase64")
    public Response<String> fileToBase64(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return Response.fail("文件不能为空");
        }
        try {
            byte[] bytes = file.getBytes();
            String base64 = Base64.getEncoder().encodeToString(bytes);
            return Response.ok(base64);
        } catch (IOException e) {
            throw new RuntimeException("读取文件失败", e);
        }
    }
    
    @ApiOperation("上传文件")
    @PostMapping("/upload")
    public Response<String> uploadFile(@RequestParam MultipartFile file) throws IOException {
        return Response.ok(fileService.uploadFile(file));
    }
    
    @ApiOperation("下载文件")
    @GetMapping("/download")
    public void downloadFile(@RequestParam String fileId) throws IOException {
        fileService.downloadFile(fileId);
    }
    
}




















