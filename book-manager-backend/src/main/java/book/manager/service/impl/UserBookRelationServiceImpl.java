package book.manager.service.impl;

import java.util.Date;

import java.util.*;
import java.util.stream.Collectors;

import book.manager.dao.service.BookDao;
import book.manager.dao.service.UserBookMessageDao;
import book.manager.dao.service.UserBookRelationDao;
import book.manager.dao.service.UserDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.common.PageDTO;
import book.manager.domain.dto.*;
import book.manager.domain.entity.Book;
import book.manager.domain.entity.User;
import book.manager.domain.entity.UserBookMessage;
import book.manager.domain.entity.UserBookRelation;
import book.manager.domain.vo.*;
import book.manager.service.UserBookRelationService;
import book.manager.utils.CollUtil;
import book.manager.utils.ListUtil;
import book.manager.utils.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.models.auth.In;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Resource
    private UserBookMessageDao userBookMessageDao;
    @Resource
    private UserDao userDao;
    
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
            handleBookNumber(dto.getUserId(), dto.getBookId(), dto.getBorrowCount(), operation);
            // 借阅
            if (operation) {
                UserBookRelation relation = new UserBookRelation();
                relation.setUserId(dto.getUserId());
                relation.setBookId(dto.getBookId());
                relation.setBorrowStatus(1);
                relation.setBorrowCount(dto.getBorrowCount());
                relation.setReturnTime(dto.getReturnTime());
                userBookRelationDao.save(relation);
            } else {
                // 取消借阅
                userBookRelationDao.lambdaUpdate()
                        .eq(UserBookRelation::getUserId, dto.getUserId())
                        .eq(UserBookRelation::getBookId, dto.getBookId())
                        .isNotNull(UserBookRelation::getBorrowStatus)
                        .set(UserBookRelation::getBorrowStatus, 0)
                        .set(UserBookRelation::getActualReturnTime, new Date())
                        .update();
            }
        }
    }
    
    /**
     * 处理书籍数量
     *
     * @param bookId
     * @param operation true借阅 false归还
     */
    private void handleBookNumber(String userId, String bookId, Integer borrowCount, Boolean operation) {
        Book book = bookDao.getById(bookId);
        // 取消借阅时，获取上次借阅的数量
        if (!operation) {
            UserBookRelation relation = userBookRelationDao.lambdaQuery()
                    .eq(UserBookRelation::getBookId, bookId)
                    .eq(UserBookRelation::getUserId, userId)
                    .orderByDesc(BaseUUID::getCreateTime)
                    .last("limit 1").one();
            borrowCount = relation.getBorrowCount() != null ? relation.getBorrowCount() : 0;
        }
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
    
    /**
     * 管理员分页查询:用户已订阅书籍
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<UserBookSubscriptionPageVO> adminUserBookSubscriptionPage(AdminUserBookSubscriptionPageDTO pageDTO) {
        // 分页数据
        List<UserBookRelation> relations = getPagedata3(pageDTO);
        
        // 准备数据
        List<String> bookIds = relations.stream().map(UserBookRelation::getBookId).distinct().collect(Collectors.toList());
        List<Book> books = bookDao.listByIds(bookIds);
        Map<String, Book> bookMap = books.stream().collect(Collectors.toMap(Book::getId, x -> x));
        
        // 构建PageVO
        List<UserBookSubscriptionPageVO> pageVOS = new ArrayList<>();
        for (UserBookRelation relation : relations) {
            UserBookSubscriptionPageVO pageVO = buildUserBookSubscriptionPageVO2(relation, bookMap);
            pageVOS.add(pageVO);
        }
        
        // 过滤
        pageVOS = filterSearch5(pageDTO, pageVOS);
        
        // 返回
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<UserBookSubscriptionPageVO> filterSearch5(AdminUserBookSubscriptionPageDTO pageDTO, List<UserBookSubscriptionPageVO> pageVOS) {
        pageVOS = filterBookName4(pageDTO.getBookName(), pageVOS);
        pageVOS = filterDateTime2(pageDTO.getStartTime(), pageDTO.getEndTime(), pageVOS);
        return pageVOS;
    }
    
    private List<UserBookSubscriptionPageVO> filterDateTime2(Date startTime, Date endTime, List<UserBookSubscriptionPageVO> pageVOS) {
        if (startTime == null || endTime == null) {
            return pageVOS;
        }
        return pageVOS.stream()
                .filter(x -> x.getCreateTime() != null && x.getCreateTime().after(startTime) && x.getCreateTime().before(endTime))
                .collect(Collectors.toList());
    }
    
    private List<UserBookSubscriptionPageVO> filterBookName4(String bookName, List<UserBookSubscriptionPageVO> pageVOS) {
        if (StrUtil.isBlank(bookName)) {
            return pageVOS;
        }
        
        return pageVOS.stream()
                .filter(x -> x.getBookName() != null && x.getBookName().contains(bookName))
                .collect(Collectors.toList());
    }
    
    private UserBookSubscriptionPageVO buildUserBookSubscriptionPageVO2(UserBookRelation relation, Map<String, Book> bookMap) {
        Book book = bookMap.get(relation.getBookId());
        
        UserBookSubscriptionPageVO pageVO = new UserBookSubscriptionPageVO();
        pageVO.setId(relation.getId());
        pageVO.setBookId(relation.getBookId());
        
        User user = userDao.getById(relation.getUserId());
        pageVO.setSubscriptionUserId(user.getId());
        pageVO.setSubscriptionRealName(user.getRealName());
        
        pageVO.setBookName(book.getName());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setNumber(book.getNumber());
        pageVO.setBookrack(book.getBookrack());
        pageVO.setCreateTime(relation.getCreateTime());
        
        return pageVO;
    }
    
    private List<UserBookRelation> getPagedata3(AdminUserBookSubscriptionPageDTO pageDTO) {
        List<UserBookRelation> relations = userBookRelationDao.listBySubscriptionStatus(1);
        return relations;
    }
    
    /**
     * 分页查询:用户已借阅书籍
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<UserBookBorrowPageVO> userBookBorrowPage(UserBookBorrowPageDTO pageDTO) {
        // 获取数据
        List<UserBookRelation> relations = userBookRelationDao.listByUserIdAndBorrowStatus(pageDTO.getUserId(), 1);
        
        // 准备数据
        List<String> bookIds = relations.stream().map(UserBookRelation::getBookId).distinct().collect(Collectors.toList());
        List<Book> books = bookDao.listByIds(bookIds);
        
        // 构建PageVO
        List<UserBookBorrowPageVO> pageVOS = new ArrayList<>();
        for (UserBookRelation relation : relations) {
            UserBookBorrowPageVO pageVO = buildUserBookBorrowPageVO(relation, books);
            pageVOS.add(pageVO);
        }
        
        // 过滤
        pageVOS = filterSearch2(pageVOS, pageDTO);
        
        // 返回
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<UserBookBorrowPageVO> filterSearch2(List<UserBookBorrowPageVO> pageVOS, UserBookBorrowPageDTO pageDTO) {
        pageVOS = filterBookName2(pageVOS, pageDTO.getBookName());
        return pageVOS;
    }
    
    private List<UserBookBorrowPageVO> filterBookName2(List<UserBookBorrowPageVO> pageVOS, String bookName) {
        if (StrUtil.isBlank(bookName)) {
            return pageVOS;
        }
        return pageVOS.stream()
                .filter(x -> x.getBookName() != null && x.getBookName().contains(bookName))
                .collect(Collectors.toList());
    }
    
    private UserBookBorrowPageVO buildUserBookBorrowPageVO(UserBookRelation relation, List<Book> books) {
        UserBookBorrowPageVO pageVO = new UserBookBorrowPageVO();
        pageVO.setBookId(relation.getBookId());
        
        Book book = books.stream().filter(x -> StrUtil.equals(x.getId(), relation.getBookId())).findFirst().get();
        pageVO.setBookName(book.getName());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setReturnTime(relation.getReturnTime());
        
        return pageVO;
    }
    
    /**
     * 分页查询:用户订阅的书籍上架通知
     *
     * @param pageDTO
     * @return 您好，您订阅的由作者创作的书籍【作者】已经上线，可以借阅了
     */
    @Override
    public Page<SubscriptionBookAddedPageVO> subscriptionBookAddedPage(SubscriptionBookAddedPageDTO pageDTO) {
        // 获取数据
        List<UserBookMessage> messages = getPageData(pageDTO);
        if (CollUtil.isEmpty(messages)) {
            return new Page<>();
        }
        
        // 准备数据
        List<String> bookIds = messages.stream().map(UserBookMessage::getBookId).collect(Collectors.toList());
        List<Book> books = bookDao.listByIds(bookIds);
        Map<String, Book> bookMap = books.stream().collect(Collectors.toMap(BaseUUID::getId, x -> x));
        
        // 构建PageVO
        List<SubscriptionBookAddedPageVO> pageVOS = new ArrayList<>();
        for (UserBookMessage message : messages) {
            SubscriptionBookAddedPageVO pageVO = buildSubscriptionBookAddedPageVO(message, bookMap);
            pageVOS.add(pageVO);
        }
        
        // 过滤
        pageVOS = filterSearch3(pageVOS, pageDTO);
        
        // 返回结果
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<SubscriptionBookAddedPageVO> filterSearch3(List<SubscriptionBookAddedPageVO> pageVOS, SubscriptionBookAddedPageDTO pageDTO) {
        pageVOS = filterBookName3(pageVOS, pageDTO.getBookName());
        return pageVOS;
    }
    
    private List<SubscriptionBookAddedPageVO> filterBookName3(List<SubscriptionBookAddedPageVO> pageVOS, String bookName) {
        if (StrUtil.isBlank(bookName)) {
            return pageVOS;
        }
        return pageVOS.stream()
                .filter(x -> x.getBookName() != null && x.getBookName().contains(bookName))
                .collect(Collectors.toList());
    }
    
    private SubscriptionBookAddedPageVO buildSubscriptionBookAddedPageVO(UserBookMessage message, Map<String, Book> bookMap) {
        Book book = bookMap.get(message.getBookId());
        
        SubscriptionBookAddedPageVO pageVO = new SubscriptionBookAddedPageVO();
        pageVO.setId(message.getId());
        pageVO.setBookId(message.getBookId());
        pageVO.setBookName(book.getName());
        pageVO.setMessage(message.getMessage());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setReadStatus(message.getReadStatus());
        pageVO.setSubscriptionDate(new Date());
        pageVO.setAddedDate(new Date());
        pageVO.setPushDate(message.getCreateTime());
        
        return pageVO;
    }
    
    private List<UserBookMessage> getPageData(SubscriptionBookAddedPageDTO pageDTO) {
        List<UserBookMessage> messages = userBookMessageDao.listByUserId(pageDTO.getUserId());
        return messages;
    }
    
    /**
     * 用户阅读消息
     *
     * @param id
     */
    @Override
    public void readBookAddedMessage(String id) {
        userBookMessageDao.lambdaUpdate()
                .eq(BaseUUID::getId, id)
                .set(UserBookMessage::getReadStatus, 1)
                .update();
    }
    
    /**
     * 用户全部阅读:书籍上架消息
     *
     * @param userId
     */
    @Override
    public void readAllBookAddedMessage(String userId) {
        userBookMessageDao.lambdaUpdate()
                .eq(UserBookMessage::getUserId, userId)
                .set(UserBookMessage::getReadStatus, 1)
                .update();
    }
    
    /**
     * 删除:书籍上架消息
     *
     * @param id
     */
    @Override
    public void deleteBookAddedMessage(String id) {
        userBookMessageDao.removeById(id);
    }
    
    /**
     * 分页查询:管理员端用户借阅记录
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<BookBorrowPageVO> adminBookBorrowPage(BookBorrowPageDTO pageDTO) {
        // 获取数据
        List<UserBookRelation> relations = getPageData2(pageDTO);
        if (CollUtil.isEmpty(relations)) {
            return new Page<>();
        }
        
        // 准备数据
        List<String> bookIds = relations.stream().map(UserBookRelation::getBookId).collect(Collectors.toList());
        List<Book> books = bookDao.listByIds(bookIds);
        Map<String, Book> bookMap = books.stream().collect(Collectors.toMap(BaseUUID::getId, x -> x));
        
        // 构建PageVO
        List<BookBorrowPageVO> pageVOS = new ArrayList<>();
        for (UserBookRelation relation : relations) {
            BookBorrowPageVO pageVO = buildBookBorrowPageVO(relation, bookMap);
            pageVOS.add(pageVO);
        }
        
        // 过滤
        pageVOS = filterSearch4(pageVOS, pageDTO);
        
        // 返回
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<BookBorrowPageVO> filterSearch4(List<BookBorrowPageVO> pageVOS, BookBorrowPageDTO pageDTO) {
        pageVOS = filterDateTime(pageVOS, pageDTO.getStartTime(), pageDTO.getEndTime());
        return pageVOS;
    }
    
    private List<BookBorrowPageVO> filterDateTime(List<BookBorrowPageVO> pageVOS, Date startTime, Date endTime) {
        if (startTime == null || endTime == null) {
            return pageVOS;
        }
        return pageVOS.stream()
                .filter(x -> {
                    if (x.getBorrowDate() == null) {
                        return false;
                    }
                    return x.getBorrowDate().after(startTime) && x.getBorrowDate().before(endTime);
                }).collect(Collectors.toList());
    }
    
    private BookBorrowPageVO buildBookBorrowPageVO(UserBookRelation relation, Map<String, Book> bookMap) {
        Book book = bookMap.get(relation.getBookId());
        
        BookBorrowPageVO pageVO = new BookBorrowPageVO();
        pageVO.setId(relation.getId());
        pageVO.setBookId(relation.getBookId());
        pageVO.setBookName(book.getName());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setNumber(book.getNumber());
        
        User user = userDao.getById(relation.getUserId());
        pageVO.setBorrowUserId(relation.getUserId());
        pageVO.setBorrowRealName(user.getRealName());
        
        pageVO.setBorrowDate(relation.getCreateTime());
        pageVO.setReturnStatus(relation.getBorrowStatus() != null && relation.getBorrowStatus() == 1);
        pageVO.setReturnTime(relation.getReturnTime());
        
        return pageVO;
    }
    
    private List<UserBookRelation> getPageData2(BookBorrowPageDTO pageDTO) {
        List<UserBookRelation> relations = userBookRelationDao.lambdaQuery()
                .isNotNull(UserBookRelation::getBorrowStatus)
                .ne(UserBookRelation::getAdminDelete, 1)
                .list();
        return relations;
    }
    
    /**
     * 删除:用户借阅记录
     *
     * @param id
     */
    @Override
    public void deleteBookBorrow(String id) {
        userBookRelationDao.lambdaUpdate()
                .eq(BaseUUID::getId, id)
                .set(UserBookRelation::getAdminDelete, 1)
                .update();
    }
}



















