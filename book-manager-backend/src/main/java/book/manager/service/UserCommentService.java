package book.manager.service;

import book.manager.domain.dto.UserCommentAddDTO;
import book.manager.domain.dto.UserCommentPageDTO;
import book.manager.domain.entity.UserComment;
import book.manager.domain.vo.UserCommentVO;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import javax.validation.Valid;
import java.util.List;

/**
 * @author: zss
 * @date: 2025/12/10
 * @desc: 用户评论
 */
public interface UserCommentService {
    
    /**
     * 新增用户评论
     *
     * @param dto
     */
    void addUserComment(UserCommentAddDTO dto);
    
    /**
     * 获取:用户评论
     *
     * @param businessId
     * @return
     */
    List<UserCommentVO> getUserComments(String businessId);
    
    /**
     * 获取:所有用户评论
     *
     * @return
     */
    List<List<UserCommentVO>> getAllUserComments(UserCommentPageDTO dto);
    
    /**
     * 分页查询:用户评论
     *
     * @param dto
     * @return
     */
    Page<List<UserCommentVO>> userCommentPage(UserCommentPageDTO dto);
    
    /**
     * 删除:用户评论
     *
     * @param id
     */
    void deleteUserComment(String id);
}
