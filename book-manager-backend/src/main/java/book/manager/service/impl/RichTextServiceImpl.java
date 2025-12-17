package book.manager.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import book.manager.dao.service.UserRichTextDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.common.IdVO;
import book.manager.domain.dto.RichTextPageDTO;
import book.manager.domain.dto.UserRichTextAddDTO;
import book.manager.domain.dto.UserRichTextUpdateDTO;
import book.manager.domain.entity.UserRichText;
import book.manager.domain.vo.RichTextPageVO;
import book.manager.domain.vo.RichTextVO;
import book.manager.domain.vo.UserVO;
import book.manager.service.RichTextService;
import book.manager.service.UserService;
import book.manager.utils.ListUtil;
import book.manager.utils.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author: zss
 * @date: 2025/11/26
 * @desc: 富文本接口
 */
@Slf4j
@Service
public class RichTextServiceImpl implements RichTextService {
    
    @Resource
    private UserService userService;
    
    @Resource
    private UserRichTextDao userRichTextDao;
    
    /**
     * 创建:富文本
     *
     * @param dto
     */
    @Override
    public IdVO createRichText(UserRichTextAddDTO dto) {
        UserVO userVO = userService.getUserById(dto.getUserId());
        
        UserRichText richText = new UserRichText();
        richText.setUserId(userVO.getId());
        richText.setUsername(userVO.getUsername());
        richText.setRealName(userVO.getRealName());
        richText.setTitle(dto.getTitle());
        richText.setContent(dto.getContent());
        
        userRichTextDao.save(richText);
        
        return new IdVO(richText.getId());
    }
    
    /**
     * 更新:富文本
     *
     * @param dto
     */
    @Override
    public void updateRichText(UserRichTextUpdateDTO dto) {
        userRichTextDao.lambdaUpdate()
                .eq(BaseUUID::getId, dto.getId())
                .set(StrUtil.isNotBlank(dto.getTitle()), UserRichText::getTitle, dto.getTitle())
                .set(UserRichText::getContent, dto.getContent())
                .update();
    }
    
    /**
     * 分页查询:公告管理
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<RichTextPageVO> richTextPage(RichTextPageDTO pageDTO) {
        // 获取数据
        Page<UserRichText> page = userRichTextDao.lambdaQuery()
                .like(StrUtil.isNotBlank(pageDTO.getTitle()), UserRichText::getTitle, pageDTO.getTitle())
                .ge(pageDTO.getStartTime() != null, UserRichText::getCreateTime, pageDTO.getStartTime())
                .le(pageDTO.getEndTime() != null, UserRichText::getCreateTime, pageDTO.getEndTime())
                .orderByDesc(BaseUUID::getCreateTime)
                .page(new Page<>(pageDTO.getCurrent(), pageDTO.getSize(), pageDTO.getSize()));
        
        // 构建pageVO
        List<RichTextPageVO> pageVOS = new ArrayList<>();
        for (UserRichText richText : page.getRecords()) {
            RichTextPageVO pageVO = buildRichTextPageVO(richText);
            pageVOS.add(pageVO);
        }
        
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize(), page.getTotal());
    }
    
    private RichTextPageVO buildRichTextPageVO(UserRichText richText) {
        RichTextPageVO pageVO = new RichTextPageVO();
        pageVO.setId(richText.getId());
        pageVO.setTitle(richText.getTitle());
        pageVO.setCreateTime(richText.getCreateTime());
        return pageVO;
    }
    
    /**
     * 删除:公告管理
     *
     * @param id
     */
    @Override
    public void deleteRichText(String id) {
        userRichTextDao.removeById(id);
    }
    
    /**
     * 根据id获取公告
     *
     * @param id
     * @return
     */
    @Override
    public RichTextVO richTextDetail(String id) {
        UserRichText userRichText = userRichTextDao.getById(id);
        
        RichTextVO vo = new RichTextVO();
        vo.setId(userRichText.getId());
        vo.setTitle(userRichText.getTitle());
        vo.setContent(userRichText.getContent());
        
        return vo;
    }
}
