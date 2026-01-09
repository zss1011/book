package book.manager.service.impl;

import book.manager.dao.service.UserCommentDao;
import book.manager.dao.service.UserDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.dto.UserCommentAddDTO;
import book.manager.domain.dto.UserCommentPageDTO;
import book.manager.domain.entity.User;
import book.manager.domain.entity.UserComment;
import book.manager.domain.vo.UserCommentVO;
import book.manager.service.UserCommentService;
import book.manager.service.UserService;
import book.manager.utils.ListUtil;
import book.manager.utils.RequestContextUtil;
import book.manager.utils.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author: zss
 * @date: 2025/12/10
 * @desc: 用户评论
 */
@Slf4j
@Service
public class UserCommentServiceImpl implements UserCommentService {
    
    @Resource
    private UserCommentDao userCommentDao;
    @Resource
    private UserDao userDao;
    
    /**
     * 新增用户评论
     *
     * @param dto
     */
    @Override
    public void addUserComment(UserCommentAddDTO dto) {
        UserComment comment = buildUserComment(dto);
        userCommentDao.save(comment);
    }
    
    private UserComment buildUserComment(UserCommentAddDTO dto) {
        UserComment comment = new UserComment();
        comment.setUserId(dto.getUserId());
        comment.setBusinessId(dto.getBusinessId());
        comment.setAnonymous(dto.getAnonymous());
        comment.setComment(dto.getComment());
        comment.setToUserId(dto.getToUserId());
        comment.setParentId(dto.getParentId());
        comment.setType(1);
        
        return comment;
    }
    
    /**
     * 获取:用户评论
     *
     * @param businessId
     * @return
     */
    @Override
    public List<UserCommentVO> getUserComments(String businessId) {
        List<UserComment> userComments = userCommentDao.listByBusinessId(businessId);
        userComments = ListUtil.naturalOrder(userComments, BaseUUID::getCreateTime);
        
        // 准备数据
        List<User> users = userDao.list();
        Map<String, User> userMap = users.stream().collect(Collectors.toMap(BaseUUID::getId, x -> x));
        
        List<UserCommentVO> vos = new ArrayList<>();
        for (UserComment userComment : userComments) {
            UserCommentVO vo = buildUserCommentVO(userComment, userMap);
            vos.add(vo);
        }
        
        return vos;
    }
    
    private UserCommentVO buildUserCommentVO(UserComment userComment, Map<String, User> userMap) {
        UserCommentVO commentVO = new UserCommentVO();
        commentVO.setId(userComment.getId());
        commentVO.setBusinessId(userComment.getBusinessId());
        commentVO.setUserId(userComment.getUserId());
        
        User user = userMap.get(userComment.getUserId());
        commentVO.setRealName(user != null ? user.getRealName() : null);
        commentVO.setAvatar(user != null ? user.getAvatar() : null);
        
        commentVO.setAnonymous(userComment.getAnonymous());
        commentVO.setComment(userComment.getComment());
        commentVO.setLikes(userComment.getLikes());
        commentVO.setToUserId(userComment.getToUserId());
        
        if (StrUtil.isNotBlank(userComment.getToUserId())) {
            User toUser = userMap.get(userComment.getToUserId());
            commentVO.setToRealName(toUser != null ? toUser.getRealName() : null);
            commentVO.setToAvatar(toUser != null ? toUser.getAvatar() : null);
        }
        
        commentVO.setParentId(userComment.getParentId());
        commentVO.setCreateTime(userComment.getCreateTime());
        return commentVO;
    }
    
    /**
     * 获取:所有用户评论
     *
     * @return
     */
    @Override
    public List<List<UserCommentVO>> getAllUserComments(UserCommentPageDTO dto) {
        List<UserComment> comments = userCommentDao.lambdaQuery().orderByDesc(BaseUUID::getCreateTime).list();
        
        // 过滤搜索条件
        comments = filterSearch(comments, dto);
        
        List<String> businessIds = comments.stream().map(UserComment::getBusinessId).distinct().collect(Collectors.toList());
        List<List<UserCommentVO>> vos = new ArrayList<>();
        for (String businessId : businessIds) {
            List<UserCommentVO> userComments = getUserComments(businessId);
            vos.add(userComments);
        }
        return vos;
    }
    
    private List<UserComment> filterSearch(List<UserComment> comments, UserCommentPageDTO dto) {
        if (dto == null) return comments;
        
        comments = filterKeyword(comments, dto.getKeyword());
        comments = filterStatus(comments, dto.getStatus());
        
        return comments;
    }
    
    private List<UserComment> filterStatus(List<UserComment> comments, Integer status) {
        if (status == null || status == 1) return comments;
        
        Map<String, List<UserComment>> map = comments.stream()
                .collect(Collectors.groupingBy(UserComment::getBusinessId));
        
        // 已回复
        if (status == 2) {
            comments = comments.stream()
                    .filter(x -> map.get(x.getBusinessId()) != null && map.get(x.getBusinessId()).size() >= 2)
                    .collect(Collectors.toList());
        }
        
        // 未回复
        if (status == 3) {
            comments = comments.stream()
                    .filter(x -> map.get(x.getBusinessId()) != null && map.get(x.getBusinessId()).size() == 1)
                    .collect(Collectors.toList());
        }
        
        // 我的发布
        if (status == 4) {
            String userId = UserServiceImpl.parseUserId(RequestContextUtil.getRequest());
            List<String> businessIds = comments.stream()
                    .filter(x -> StrUtil.equals(x.getUserId(), userId))
                    .map(UserComment::getBusinessId)
                    .collect(Collectors.toList());
            comments = comments.stream()
                    .filter(x -> businessIds.contains(x.getBusinessId()))
                    .collect(Collectors.toList());
        }
        
        return comments;
    }
    
    private List<UserComment> filterKeyword(List<UserComment> comments, String keyword) {
        if (StrUtil.isBlank(keyword)) return comments;
        
        return comments.stream()
                .filter(x -> x.getComment() != null && x.getComment().contains(keyword))
                .collect(Collectors.toList());
    }
    
    /**
     * 分页查询:用户评论
     *
     * @param dto
     * @return keyword
     */
    @Override
    public Page<List<UserCommentVO>> userCommentPage(UserCommentPageDTO dto) {
        List<List<UserCommentVO>> userComments = getAllUserComments(dto);
        return ListUtil.buildPage(userComments, dto.getCurrent(), dto.getSize());
    }
    
    /**
     * 删除:用户评论
     *
     * @param id
     */
    @Override
    public void deleteUserComment(String id) {
        userCommentDao.removeById(id);
    }
}





















