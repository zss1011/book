package book.manager.service.impl;

import book.manager.dao.service.SystemConfigDao;
import book.manager.domain.entity.SystemConfig;
import book.manager.service.SystemConfigService;
import book.manager.utils.JsonUtil;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author: zss
 * @date: 2025/10/22
 * @desc: 系统配置接口 serviceImpl
 */
@Slf4j
@Service
public class SystemConfigServiceImpl implements SystemConfigService {
    
    @Resource
    private SystemConfigDao systemConfigDao;
    
    /**
     * 查询书架配置
     *
     * @return
     */
    @Override
    public List<String> bookrackConfig() {
        SystemConfig config = systemConfigDao.getByConfigName("书架");
        return JsonUtil.parseArray(config.getConfigContent(), String.class);
    }
    
    /**
     * 查询:书籍类别
     *
     * @return
     */
    @Override
    public List<String> bookTypeConfig() {
        SystemConfig config = systemConfigDao.getByConfigName("书籍类别");
        return JsonUtil.parseArray(config.getConfigContent(), String.class);
    }
    
    /**
     * 修改:书籍类别
     */
    @Override
    public void updateBookTypeConfig(String oldBookType, String newBookType) {
        SystemConfig config = systemConfigDao.getByConfigName("书籍类别");
        List<String> bookTypes = JsonUtil.parseArray(config.getConfigContent(), String.class);
        bookTypes.remove(oldBookType);
        bookTypes.add(newBookType);
        systemConfigDao.lambdaUpdate()
                .eq(SystemConfig::getConfigName, "书籍类别")
                .set(SystemConfig::getConfigContent, JsonUtil.toJSONString(bookTypes))
                .update();
    }
    
    /**
     * 删除:书籍类别
     *
     * @param bookType
     */
    @Override
    public void deleteBookTypeConfig(String bookType) {
        SystemConfig config = systemConfigDao.getByConfigName("书籍类别");
        List<String> bookTypes = JsonUtil.parseArray(config.getConfigContent(), String.class);
        bookTypes.remove(bookType);
        systemConfigDao.lambdaUpdate()
                .eq(SystemConfig::getConfigName, "书籍类别")
                .set(SystemConfig::getConfigContent, JsonUtil.toJSONString(bookTypes))
                .update();
    }
    
    /**
     * 新增:书籍类别
     *
     * @param bookType
     */
    @Override
    public void addBookTypeConfig(String bookType) {
        SystemConfig config = systemConfigDao.getByConfigName("书籍类别");
        List<String> bookTypes = JsonUtil.parseArray(config.getConfigContent(), String.class);
        bookTypes.remove(bookType);
        bookTypes.add(bookType);
        systemConfigDao.lambdaUpdate()
                .eq(SystemConfig::getConfigName, "书籍类别")
                .set(SystemConfig::getConfigContent, JsonUtil.toJSONString(bookTypes))
                .update();
    }
    
    /**
     * 修改:书架配置
     *
     * @param oldBookrack
     * @param newBookrack
     */
    @Override
    public void updateBookrackConfig(String oldBookrack, String newBookrack) {
        if (StringUtils.isAnyBlank(oldBookrack, newBookrack)) {
            return;
        }
        SystemConfig config = systemConfigDao.getByConfigName("书架");
        List<String> bookracks = JsonUtil.parseArray(config.getConfigContent(), String.class);
        bookracks.remove(oldBookrack);
        bookracks.add(newBookrack);
        systemConfigDao.lambdaUpdate()
                .eq(SystemConfig::getConfigName, "书架")
                .set(SystemConfig::getConfigContent, JsonUtil.toJSONString(bookracks))
                .update();
    }
    
    @Override
    public void deleteBookrackConfig(String bookrack) {
        SystemConfig config = systemConfigDao.getByConfigName("书架");
        List<String> bookracks = JsonUtil.parseArray(config.getConfigContent(), String.class);
        bookracks.remove(bookrack);
        systemConfigDao.lambdaUpdate()
                .eq(SystemConfig::getConfigName, "书架")
                .set(SystemConfig::getConfigContent, JsonUtil.toJSONString(bookracks))
                .update();
    }
}
