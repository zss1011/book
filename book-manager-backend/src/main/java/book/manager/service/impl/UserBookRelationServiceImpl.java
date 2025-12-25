package book.manager.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import book.manager.dao.service.BookDao;
import book.manager.dao.service.UserBookRelationDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.dto.UserBookOperationDTO;
import book.manager.domain.dto.UserBookRelationPageDTO;
import book.manager.domain.entity.Book;
import book.manager.domain.entity.UserBookRelation;
import book.manager.domain.vo.UserBookCollectPageVO;
import book.manager.domain.vo.UserBookSubscriptionPageVO;
import book.manager.service.UserBookRelationService;
import book.manager.utils.CollUtil;
import book.manager.utils.ListUtil;
import book.manager.utils.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.validation.constraints.NotBlank;

/**
 * @author: zss
 * @date: 2025/12/18
 * @desc: 用户书籍关联
 */
@Slf4j
@Service
public class UserBookRelationServiceImpl implements UserBookRelationService {
    
    @Resource
    private UserBookRelationDao userBookRelationDao;
    @Resource
    private BookDao bookDao;
    
    /**
     * 用户书籍操作:订阅、收藏、借阅
     *
     * @param dto
     */
    @Override
    public void userBookOperation(UserBookOperationDTO dto) {
        Integer type = dto.getType();
        Boolean operation = dto.getOperation();
        
        // 订阅
        if (type == 1) {
            // 先统一取消
            userBookRelationDao.lambdaUpdate()
                    .eq(UserBookRelation::getUserId, dto.getUserId())
                    .eq(UserBookRelation::getBookId, dto.getBookId())
                    .isNotNull(UserBookRelation::getSubscriptionStatus)
                    .remove();
            if (!operation) {
                return;
            }
            UserBookRelation relation = new UserBookRelation();
            relation.setUserId(dto.getUserId());
            relation.setBookId(dto.getBookId());
            relation.setSubscriptionStatus(1);
            userBookRelationDao.save(relation);
        }
        
        // 收藏
        if (type == 2) {
            userBookRelationDao.lambdaUpdate()
                    .eq(UserBookRelation::getUserId, dto.getUserId())
                    .eq(UserBookRelation::getBookId, dto.getBookId())
                    .isNotNull(UserBookRelation::getCollectStatus)
                    .remove();
            if (!operation) {
                return;
            }
            UserBookRelation relation = new UserBookRelation();
            relation.setUserId(dto.getUserId());
            relation.setBookId(dto.getBookId());
            relation.setCollectStatus(1);
            userBookRelationDao.save(relation);
        }
        
        // 借阅
        if (type == 3) {
            // 处理书籍数量
            handleBookNumber(dto.getUserId(), dto.getBookId(), operation);
            userBookRelationDao.lambdaUpdate()
                    .eq(UserBookRelation::getUserId, dto.getUserId())
                    .eq(UserBookRelation::getBookId, dto.getBookId())
                    .isNotNull(UserBookRelation::getBorrowStatus)
                    .remove();
            if (!operation) {
                return;
            }
            UserBookRelation relation = new UserBookRelation();
            relation.setUserId(dto.getUserId());
            relation.setBookId(dto.getBookId());
            relation.setBorrowStatus(1);
            relation.setBorrowCount(dto.getBorrowCount());
            relation.setReturnTime(dto.getReturnTime());
            userBookRelationDao.save(relation);
        }
    }
    
    /**
     * 处理书籍数量
     *
     * @param userId
     * @param bookId
     * @param operation true借阅 false归还
     */
    private void handleBookNumber(String userId, String bookId, Boolean operation) {
        UserBookRelation relation = userBookRelationDao.lambdaQuery()
                .eq(UserBookRelation::getUserId, userId)
                .eq(UserBookRelation::getBookId, bookId)
                .eq(UserBookRelation::getBorrowStatus, 1)
                .one();
        Integer borrowCount = relation.getBorrowCount();
        Book book = bookDao.getById(bookId);
        book.setNumber(operation ? book.getNumber() - borrowCount : book.getNumber() + borrowCount);
        bookDao.updateById(book);
    }
    
    /**
     * 分页查询:用户已收藏书籍
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<UserBookCollectPageVO> userBookRelationPage(UserBookRelationPageDTO pageDTO) {
        // 获取分页数据
        List<UserBookRelation> relations = userBookRelationDao.listByUserIdAndCollectStatus(pageDTO.getUserId(), 1);
        if (CollUtil.isEmpty(relations)) return new Page<>();
        
        // 准备数据
        List<String> bookIds = relations.stream().map(UserBookRelation::getBookId).distinct().collect(Collectors.toList());
        List<Book> books = bookDao.listByIds(bookIds);
        Map<String, Book> bookMap = books.stream().collect(Collectors.toMap(Book::getId, x -> x));
        List<UserBookRelation> borrows = userBookRelationDao.listByUserIdAndBorrowStatus(pageDTO.getUserId(), 1);
        
        // 构建PageVO
        List<UserBookCollectPageVO> pageVOS = new ArrayList<>();
        for (UserBookRelation relation : relations) {
            UserBookCollectPageVO pageVO = buildUserBookCollectPageVO(relation, bookMap, borrows);
            pageVOS.add(pageVO);
        }
        
        // 过滤
        pageVOS = filterSearch(pageVOS, pageDTO);
        
        // 返回
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<UserBookCollectPageVO> filterSearch(List<UserBookCollectPageVO> pageVOS, UserBookRelationPageDTO pageDTO) {
        pageVOS = filterBookName(pageVOS, pageDTO.getBookName());
        return pageVOS;
    }
    
    private List<UserBookCollectPageVO> filterBookName(List<UserBookCollectPageVO> pageVOS, String bookName) {
        if (StrUtil.isBlank(bookName)) return pageVOS;
        
        return pageVOS.stream()
                .filter(x -> x.getBookName() != null && x.getBookName().contains(bookName))
                .collect(Collectors.toList());
    }
    
    private UserBookCollectPageVO buildUserBookCollectPageVO(UserBookRelation relation, Map<String, Book> bookMap, List<UserBookRelation> borrows) {
        Book book = bookMap.get(relation.getBookId());
        
        UserBookCollectPageVO pageVO = new UserBookCollectPageVO();
        pageVO.setBookId(book.getId());
        pageVO.setBookName(book.getName());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setNumber(book.getNumber());
        pageVO.setBookrack(book.getBookrack());
        
        pageVO.setBorrowStatus(false);
        for (UserBookRelation borrow : borrows) {
            if (StrUtil.equals(borrow.getBookId(), book.getId())) {
                pageVO.setBorrowStatus(true);
                break;
            }
        }
        
        return pageVO;
    }
    
    /**
     * 分页查询:用户已订阅书籍
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<UserBookSubscriptionPageVO> userBookSubscriptionPage(UserBookRelationPageDTO pageDTO) {
        // 获取分页数据
        List<UserBookRelation> relations = userBookRelationDao.listByUserIdAndSubscriptionStatus(pageDTO.getUserId(), 1);
        if (CollUtil.isEmpty(relations)) return new Page<>();
        
        // 准备数据
        List<String> bookIds = relations.stream().map(UserBookRelation::getBookId).distinct().collect(Collectors.toList());
        List<Book> books = bookDao.listByIds(bookIds);
        Map<String, Book> bookMap = books.stream().collect(Collectors.toMap(Book::getId, x -> x));
        
        // 构建PageVO
        List<UserBookSubscriptionPageVO> pageVOS = new ArrayList<>();
        for (UserBookRelation relation : relations) {
            UserBookSubscriptionPageVO pageVO = buildUserBookSubscriptionPageVO(relation, bookMap);
            pageVOS.add(pageVO);
        }
        
        // 过滤
        pageVOS = filterSearch1(pageVOS, pageDTO);
        
        // 返回PageVO
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<UserBookSubscriptionPageVO> filterSearch1(List<UserBookSubscriptionPageVO> pageVOS, UserBookRelationPageDTO pageDTO) {
        pageVOS = filterBookName1(pageVOS, pageDTO.getBookName());
        return pageVOS;
    }
    
    private List<UserBookSubscriptionPageVO> filterBookName1(List<UserBookSubscriptionPageVO> pageVOS, String bookName) {
        if (StrUtil.isBlank(bookName)) return pageVOS;
        
        return pageVOS.stream()
                .filter(x -> x.getBookName() != null && x.getBookName().contains(bookName))
                .collect(Collectors.toList());
    }
    
    private UserBookSubscriptionPageVO buildUserBookSubscriptionPageVO(UserBookRelation relation, Map<String, Book> bookMap) {
        Book book = bookMap.get(relation.getBookId());
        
        UserBookSubscriptionPageVO pageVO = new UserBookSubscriptionPageVO();
        pageVO.setBookId(book.getId());
        pageVO.setBookName(book.getName());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setNumber(book.getNumber());
        pageVO.setBookrack(book.getBookrack());
        
        return pageVO;
    }
}
