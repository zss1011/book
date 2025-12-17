package book.manager.controller;

import book.manager.domain.dto.Test04DTO;
import book.manager.service.TestService;
import lombok.extern.slf4j.Slf4j;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.web.bind.annotation.*;

import java.io.FileInputStream;
import java.net.URLEncoder;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import javax.annotation.Resource;

/**
 * @author: zss
 * @date: 2025/9/26
 * @desc:
 */
@Slf4j
@RestController
@RequestMapping("/test/v1")
public class TestController {
    
    @Resource
    private TestService testService;
    
    @GetMapping("/test01")
    public String test01(@RequestParam String ticket, @RequestParam String service) {
        log.info("ticket:{}", ticket);
        log.info("service:{}", service);
        String message = "<cas:serviceResponse xmlns:cas='http://www.yale.edu/tp/cas'>\n" +
                "    <cas:authenticationSuccess>\n" +
                "        <cas:user>%7B%22logintime%22%3A1758781594833%2C%22name%22%3A%22%E5%90%B4%E6%99%93%E6%B3%A2%22%2C%22pwdBeforeDecode%22%3A%22%22%2C%22baseOrgId%22%3A%228a8128974305ecc9014306012dd90000%22%2C%22iscUserId%22%3A%22662b94fe0ba1001%22%2C%22iscAdCode%22%3A%22D96120115%22%2C%22passWord%22%3A%225D1FE520A26F501036EC8BDAE276D402BC5E5D31FE6EEFA70AD84EA1%22%2C%22scop%22%3A%220%22%2C%22iscUserSourceId%22%3A%22D96120115%22%2C%22ip%22%3A%2210.136.211.71%22%2C%22state%22%3A%221%22%2C%22id%22%3A%22662b94fe0ba1001%22%2C%22username%22%3A%22D96120115%22%7D</cas:user>\n" +
                "    </cas:authenticationSuccess>\n" +
                "</cas:serviceResponse>";
        return message;
    }
    
    public static void main(String[] args) {
        long l = System.currentTimeMillis();
        System.out.println(l);
    }
    
    @GetMapping("/test02")
    public ResponseEntity<byte[]> test02() throws Exception {
        String text = test03();
        String filename = System.currentTimeMillis() + ".docx";
        
        byte[] bytes = text.getBytes();
        
        
        // 中文文件名兼容写法（JDK8 无 ContentDisposition builder）
        String encodedName = URLEncoder.encode(filename, "UTF-8").replaceAll("\\+", "%20");
        String headerValue = "attachment; filename=\"" + filename + "\"; filename*=UTF-8''" + encodedName;
        
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", headerValue);
        headers.setContentType(MediaType.parseMediaType(
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"));
        headers.setContentLength(bytes.length);
        
        return ResponseEntity.ok()
                .headers(headers)
                .body(bytes);
    }
    
    public static String test03() throws Exception {
        FileInputStream input = new FileInputStream("/Users/zhousensen/Desktop/MJ20230040.pdf");
        try (PDDocument doc = PDDocument.load(input)) {
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(doc);
            input.close();
            return text;
        } catch (Exception e) {
            input.close();
            return null;
        }
    }
    
    @PostMapping("/test04")
    public void test04(@RequestBody Test04DTO dto) throws Exception {
    }
    
    
}


