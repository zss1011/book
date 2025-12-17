package book.manager.dao.service.impl;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;

import book.manager.dao.service.CommonFileDao;
import book.manager.dao.service.FileService;
import book.manager.domain.entity.CommonFile;
import book.manager.utils.FileUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author: zss
 * @date: 2025/9/30
 * @desc: 文件服务
 */
@Slf4j
@Service
public class FileServiceImpl implements FileService {
    
    @Resource
    private CommonFileDao commonFileDao;
    
    /**
     * 上传文件
     *
     * @param file
     */
    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        CommonFile commonFile = buildCommonFile(file);
        commonFileDao.save(commonFile);
        return commonFile.getId();
    }
    
    private CommonFile buildCommonFile(MultipartFile file) throws IOException {
        String fileName = file.getOriginalFilename();
        byte[] bytes = file.getBytes();
        
        CommonFile commonFile = new CommonFile();
        commonFile.setFileName(fileName);
        commonFile.setFileBinary(bytes);
        
        int sizeBytes = bytes.length;
        BigDecimal fileSize = new BigDecimal(sizeBytes).divide(new BigDecimal(1024 * 1024), 6, RoundingMode.DOWN);
        commonFile.setFileSize(fileSize);
        
        return commonFile;
    }
    
    /**
     * 下载文件
     *
     * @param fileId
     */
    @Override
    public void downloadFile(String fileId) throws IOException {
        CommonFile file = commonFileDao.getById(fileId);
        byte[] data = file.getFileBinary();
        String filename = file.getFileName();
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletResponse response = attrs.getResponse();
        FileUtil.setFileName(filename, response);
        FileUtil.downLoadFile(data, response.getOutputStream());
    }
}
