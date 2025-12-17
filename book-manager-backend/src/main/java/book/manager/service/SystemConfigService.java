package book.manager.service;

import java.util.List;

/**
 * @author: zss
 * @date: 2025/10/22
 * @desc: 系统配置接口 service
 */
public interface SystemConfigService {
    
    /**
     * 查询书架配置
     *
     * @return
     */
    List<String> bookrackConfig();
    
    /**
     * 查询:书籍类别
     *
     * @return
     */
    List<String> bookTypeConfig();
    
    /**
     * 修改:书籍类别
     */
    void updateBookTypeConfig(String oldBookType, String newBookType);
    
    /**
     * 删除:书籍类别
     *
     * @param bookType
     */
    void deleteBookTypeConfig(String bookType);
    
    /**
     * 新增:书籍类别
     *
     * @param bookType
     */
    void addBookTypeConfig(String bookType);
    
    /**
     * 修改:书架配置
     *
     * @param oldBookrack
     * @param newBookrack
     */
    void updateBookrackConfig(String oldBookrack, String newBookrack);
    
    void deleteBookrackConfig(String bookrack);
}
