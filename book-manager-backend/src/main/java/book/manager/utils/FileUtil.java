package book.manager.utils;

import cn.hutool.core.io.file.FileNameUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.net.URLEncoder;
import java.nio.file.Files;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * @author: zss
 * @date: 2023/4/27
 * @desc: 文件工具类
 */
@Slf4j
public class FileUtil {
    
    /**
     * 文件下载
     *
     * @param data         文件的二进制内容
     * @param outputStream 响应输出流
     */
    public static void downLoadFile(byte[] data, OutputStream outputStream) {
        try {
            // 直接写入字节数组
            outputStream.write(data);
            outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    /**
     * 文件下载
     *
     * @param inputStream
     * @param outputStream
     */
    public static void downLoadFile(InputStream inputStream, OutputStream outputStream) {
        try {
            int count;
            byte[] bytes = new byte[1024 * 8];
            while ((count = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, count);
            }
            outputStream.flush();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (inputStream != null) {
                    inputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
            try {
                if (outputStream != null) {
                    outputStream.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
    
    /**
     * 文件下载到指定目录
     */
    public static void downLoadFile(InputStream inputStream, File file) {
        OutputStream outputStream = null;
        try {
            outputStream = Files.newOutputStream(file.toPath());
            int count;
            byte[] bytes = new byte[1024 * 8];
            while ((count = inputStream.read(bytes)) != -1) {
                outputStream.write(bytes, 0, count);
            }
            outputStream.flush();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                try {
                    inputStream.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }
    }
    
    /**
     * 设置文件响应流的中文文件名
     *
     * @param fileName 文件名(包含前后缀)
     * @param response
     * @throws UnsupportedEncodingException
     */
    public static void setFileName(String fileName, HttpServletResponse response) throws UnsupportedEncodingException {
        // 文件名不带后缀
        String prefixName = fileName.split("\\.")[0];
        prefixName = URLEncoder.encode(prefixName, "UTF-8").replaceAll("\\+", "%20");
        
        // 文件名+后缀
        prefixName = prefixName + "." + fileName.split("\\.")[1];
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + prefixName);
        response.setContentType("application/octet-stream");
        response.setCharacterEncoding("UTF-8");
    }
    
    /**
     * 获取文件夹下所有文件
     *
     * @param file
     * @return
     */
    public static List<File> scanFiles(File file) {
        File[] childFiles = file.listFiles();
        List<File> files = new ArrayList<>();
        for (File childFile : childFiles) {
            if (childFile.isFile()) {
                files.add(childFile);
            }
            if (childFile.isDirectory()) {
                List<File> cFiles = scanFiles(childFile);
                files.addAll(cFiles);
            }
        }
        return files;
    }
    
    /**
     * 获取jar中的文件对象(文件名+inputStream)
     */
    public static void getJarFiles() throws IOException {
        // 开发环境jar路径
        String jarFilePath = "/Users/zss/Documents/code/my/my-project/my-module/my-service-a/target/my-service-a.jar";
        // resources下的资源目录
        String targetPath = "file/report";
        String jarPath = FileUtil.class.getProtectionDomain().getCodeSource().getLocation().getPath();
        // 部署环境自动获取jar路径
        if (jarPath.contains(".jar")) {
            jarFilePath = jarPath.replace("file:", "").split("jar")[0] + "jar";
        }
        
        JarFile jarFile = new JarFile(jarFilePath);
        Enumeration<JarEntry> entries = jarFile.entries();
        while (entries.hasMoreElements()) {
            JarEntry entry = entries.nextElement();
            if (entry.getName().contains(targetPath) && !entry.isDirectory()) {
                // 文件名
                String fileName = entry.getName();
                // inputStream:可上传、下载文件
                InputStream inputStream = jarFile.getInputStream(entry);
                inputStream.close();
            }
        }
        jarFile.close();
    }
    
    /**
     * 压缩文件目录
     *
     * @param sourceFolderPath
     * @param zipFilePath
     */
    public static void zipFolder(String sourceFolderPath, String zipFilePath) {
        try {
            FileOutputStream fos = new FileOutputStream(zipFilePath);
            ZipOutputStream zos = new ZipOutputStream(fos);
            
            File sourceFolder = new File(sourceFolderPath);
            compressFolder(sourceFolder, sourceFolder.getName(), zos);
            
            zos.close();
            fos.close();
        } catch (Exception e) {
            throw new RuntimeException("压缩文件失败:" + e.getMessage(), e);
        }
    }
    
    @SuppressWarnings("all")
    private static void compressFolder(File folder, String parentFolder, ZipOutputStream zos) throws IOException {
        for (File file : folder.listFiles()) {
            if (file.isDirectory()) {
                compressFolder(file, parentFolder + "/" + file.getName(), zos);
            } else {
                byte[] buffer = new byte[1024];
                FileInputStream fis = new FileInputStream(file);
                zos.putNextEntry(new ZipEntry(parentFolder + "/" + file.getName()));
                
                int length;
                while ((length = fis.read(buffer)) > 0) {
                    zos.write(buffer, 0, length);
                }
                
                zos.closeEntry();
                fis.close();
            }
        }
    }
    
    /**
     * 删除文件或文件夹
     *
     * @param filepath
     */
    public static void deleteFileOrDirectory(String filepath) {
        // 创建File对象
        File file = new File(filepath);
        // 检查文件或文件夹是否存在
        if (file.exists()) {
            // 如果是文件夹，则递归删除文件夹中的所有内容
            if (file.isDirectory()) {
                deleteDirectory(file);
            } else {
                // 如果是文件，则直接删除文件
                file.delete();
            }
        }
    }
    
    /**
     * 删除文件夹
     *
     * @param directory
     */
    public static void deleteDirectory(File directory) {
        File[] files = directory.listFiles();
        if (files != null) {
            for (File file : files) {
                if (file.isDirectory()) {
                    deleteDirectory(file);
                } else {
                    file.delete();
                }
            }
        }
        directory.delete();
    }
    
    /**
     * 根据输入流转化成byte[]
     *
     * @param inputStream
     * @return
     */
    public static byte[] file2Bytes(InputStream inputStream) throws Exception {
        List<Byte> byteList = new ArrayList<>();
        int read = 0;
        byte[] bytes = new byte[1024 * 8];
        while (read != -1) {
            read = inputStream.read(bytes);
            for (int i = 0; i < read; i++) {
                byteList.add(bytes[i]);
            }
            
        }
        byte[] result = new byte[byteList.size()];
        for (int i = 0; i < byteList.size(); i++) {
            result[i] = byteList.get(i);
        }
        inputStream.close();
        return result;
    }
    
    /**
     * 生成文件MD5
     *
     * @param filePath
     * @return
     * @throws IOException
     * @throws NoSuchAlgorithmException
     */
    public static String generateFileMD5(String filePath) throws IOException, NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("MD5");
        try (FileInputStream fis = new FileInputStream(filePath)) {
            byte[] buffer = new byte[1024 * 8];
            int bytesRead;
            while ((bytesRead = fis.read(buffer)) != -1) {
                md.update(buffer, 0, bytesRead);
            }
        }
        byte[] digest = md.digest();
        
        // Convert the byte array to a hexadecimal string
        StringBuilder sb = new StringBuilder();
        for (byte b : digest) {
            sb.append(String.format("%02x", b & 0xff));
        }
        return sb.toString();
    }
    
    // 二进制数据转换成base64数据，前端再解析成图片、html等
    /*
            String encode = "data:image/" + file.getName().split("\\.")[1] + ";base64,";
            List<Byte> bytes = ossService.fileBytes(file.getPath());
            byte[] byteArray = new byte[bytes.size()];
            for (int i = 0; i < bytes.size(); i++) {
                byteArray[i] = bytes.get(i);
            }
            encode = encode + new BASE64Encoder().encode(byteArray); // 过时
            encode += Base64.getEncoder().withoutPadding().encodeToString(byteArray); // 这种方式更合适
     */
    
    /**
     * List<byte>转byte[]
     *
     * @param byteList
     * @return
     */
    public static byte[] list2Bytes(List<Byte> byteList) {
        byte[] bytes = new byte[byteList.size()];
        for (int i = 0; i < byteList.size(); i++) {
            bytes[i] = byteList.get(i);
        }
        return bytes;
    }
    
    /**
     * byte[]转List<byte>
     *
     * @param bytes
     * @return
     */
    public static List<Byte> bytes2List(byte[] bytes) {
        List<Byte> byteList = new ArrayList<>();
        for (byte b : bytes) {
            byteList.add(b);
        }
        return byteList;
    }
    
    /**
     * 获取文件后缀名,不带.
     *
     * @param fileName
     * @return
     */
    public static String getSuffix(String fileName) {
        return FileNameUtil.getSuffix(fileName);
    }
    
    /**
     * 获取文件前缀
     *
     * @param fileName
     * @return
     */
    public static String getPrefix(String fileName) {
        int index = fileName.lastIndexOf(".");
        String prefix = fileName.substring(0, index);
        return prefix;
    }
    
    /**
     * 获取文件后缀
     *
     * @param filename
     * @return
     */
    public static String getPostfix(String filename) {
        String[] split = filename.split("\\.");
        return split[split.length - 1];
    }
    
    /**
     * 根据文件类型获取MediaType
     *
     * @param fileType
     * @return
     */
    public static MediaType getMediaType(String fileType) {
        Map<String, MediaType> mediaTypeMap = new HashMap<>();
        
        // 图像类型
        mediaTypeMap.put("png", MediaType.IMAGE_PNG);
        mediaTypeMap.put("jpg", MediaType.IMAGE_JPEG);
        mediaTypeMap.put("jpeg", MediaType.IMAGE_JPEG);
        mediaTypeMap.put("gif", MediaType.valueOf("image/gif"));
        mediaTypeMap.put("bmp", MediaType.valueOf("image/bmp"));
        mediaTypeMap.put("tiff", MediaType.valueOf("image/tiff"));
        mediaTypeMap.put("svg", MediaType.valueOf("image/svg+xml"));
        
        // 视频类型
        mediaTypeMap.put("mp4", MediaType.valueOf("video/mp4"));
        mediaTypeMap.put("webm", MediaType.valueOf("video/webm"));
        mediaTypeMap.put("mov", MediaType.valueOf("video/quicktime"));
        mediaTypeMap.put("avi", MediaType.valueOf("video/x-msvideo"));
        mediaTypeMap.put("mpeg", MediaType.valueOf("video/mpeg"));
        mediaTypeMap.put("flv", MediaType.valueOf("video/x-flv"));
        mediaTypeMap.put("3gp", MediaType.valueOf("video/3gpp"));
        
        // 音频类型
        mediaTypeMap.put("mp3", MediaType.valueOf("audio/mpeg"));
        mediaTypeMap.put("wav", MediaType.valueOf("audio/x-wav"));
        mediaTypeMap.put("ogg", MediaType.valueOf("audio/ogg"));
        mediaTypeMap.put("aac", MediaType.valueOf("audio/aac"));
        
        // 文档类型
        mediaTypeMap.put("pdf", MediaType.valueOf("application/pdf"));
        mediaTypeMap.put("txt", MediaType.valueOf("text/plain"));
        mediaTypeMap.put("html", MediaType.valueOf("text/html"));
        mediaTypeMap.put("xml", MediaType.valueOf("application/xml"));
        mediaTypeMap.put("json", MediaType.APPLICATION_JSON);
        mediaTypeMap.put("csv", MediaType.valueOf("text/csv"));
        mediaTypeMap.put("xls", MediaType.valueOf("application/vnd.ms-excel"));
        mediaTypeMap.put("xlsx", MediaType.valueOf("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"));
        mediaTypeMap.put("doc", MediaType.valueOf("application/msword"));
        mediaTypeMap.put("docx", MediaType.valueOf("application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
        
        // 其他类型
        mediaTypeMap.put("zip", MediaType.valueOf("application/zip"));
        mediaTypeMap.put("rar", MediaType.valueOf("application/x-rar-compressed"));
        
        MediaType mediaType = mediaTypeMap.get(fileType.toLowerCase());
        if (mediaType == null) {
            throw new RuntimeException("获取文件对应MediaType失败:" + fileType);
        }
        return mediaType;
    }
    
}
