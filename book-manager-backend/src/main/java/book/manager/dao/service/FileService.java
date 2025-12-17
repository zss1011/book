package book.manager.dao.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

/**
 * @author: zss
 * @date: 2025/9/30
 * @desc: 文件服务
 */
public interface FileService {
    
    /**
     * 上传文件
     *
     * @param file
     */
    String uploadFile(MultipartFile file) throws IOException;
    
    /**
     * 下载文件
     *
     * @param fileId
     */
    void downloadFile(String fileId) throws IOException;
}
