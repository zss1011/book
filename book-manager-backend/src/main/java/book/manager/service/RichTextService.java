package book.manager.service;

import book.manager.domain.common.IdVO;
import book.manager.domain.dto.RichTextPageDTO;
import book.manager.domain.dto.UserRichTextAddDTO;
import book.manager.domain.dto.UserRichTextUpdateDTO;
import book.manager.domain.vo.RichTextPageVO;
import book.manager.domain.vo.RichTextVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.validation.Valid;

/**
 * @author: zss
 * @date: 2025/11/26
 * @desc: 富文本接口
 */
public interface RichTextService {
    
    /**
     * 创建:富文本
     *
     * @param dto
     */
    IdVO createRichText(@Valid UserRichTextAddDTO dto);
    
    /**
     * 更新:富文本
     *
     * @param dto
     */
    void updateRichText(@Valid UserRichTextUpdateDTO dto);
    
    /**
     * 分页查询:公告管理
     *
     * @param pageDTO
     * @return
     */
    Page<RichTextPageVO> richTextPage(@Valid RichTextPageDTO pageDTO);
    
    /**
     * 删除:公告管理
     *
     * @param id
     */
    void deleteRichText(String id);
    
    /**
     * 根据id获取公告
     *
     * @param id
     * @return
     */
    RichTextVO richTextDetail(String id);
}
