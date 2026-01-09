package book.manager.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import book.manager.dao.service.BookDao;
import book.manager.dao.service.CommonFileDao;
import book.manager.dao.service.UserBookMessageDao;
import book.manager.dao.service.UserBookRelationDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.dto.BookAddDTO;
import book.manager.domain.dto.BookPageDTO;
import book.manager.domain.dto.BookUpdateDTO;
import book.manager.domain.entity.Book;
import book.manager.domain.entity.UserBookMessage;
import book.manager.domain.entity.UserBookRelation;
import book.manager.domain.vo.BookPageVO;
import book.manager.domain.vo.BookVO;
import book.manager.service.BookService;
import book.manager.threadLocal.UserContext;
import book.manager.utils.BeanUtil;
import book.manager.utils.CollUtil;
import book.manager.utils.ListUtil;
import book.manager.utils.StrUtil;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

/**
 * @author: zss
 * @date: 2025/9/2
 * @desc: 书籍 serviceImpl
 */
@Slf4j
@Service
public class BookServiceImpl implements BookService {
    
    @Resource
    private BookDao bookDao;
    @Resource
    private CommonFileDao commonFileDao;
    @Resource
    private UserBookRelationDao userBookRelationDao;
    @Resource
    private UserBookMessageDao userBookMessageDao;
    
    /**
     * 新增书籍
     *
     * @param addDTO
     */
    @Override
    public void addBook(BookAddDTO addDTO) {
        Book book = buildBook(addDTO);
        bookDao.save(book);
    }
    
    private Book buildBook(BookAddDTO addDTO) {
        Book book = new Book();
        book.setName(addDTO.getName());
        book.setPublishers(addDTO.getPublishers());
        book.setAuthor(addDTO.getAuthor());
        book.setBookNo(addDTO.getBookNo());
        book.setBookInfo(addDTO.getBookInfo());
        book.setBookrack(addDTO.getBookrack());
        book.setType(addDTO.getType());
        book.setNumber(addDTO.getNumber());
        book.setCover(addDTO.getCover());
        book.setAddedDate(addDTO.getAddedDate());
        book.setStatus(addDTO.getStatus());
        if (addDTO.getStatus() != null && addDTO.getStatus() == 1) {
            book.setAddedDate(addDTO.getAddedDate());
        }
        return book;
    }
    
    /**
     * 分页查询:书籍
     *
     * @param pageDTO
     * @return
     */
    @Override
    public Page<BookPageVO> bookPage(BookPageDTO pageDTO) {
        // 查询数据
        List<Book> books = getPageData(pageDTO);
        
        books = filterSearch(books, pageDTO);
        
        // 准备数据
        List<UserBookRelation> userBookRelations = userBookRelationDao.listByUserId(UserContext.getUserId());
        Map<String, List<UserBookRelation>> userBookRelationMap = userBookRelations.stream().collect(Collectors.groupingBy(UserBookRelation::getBookId));
        
        // 构建PageVO
        List<BookPageVO> pageVOS = new ArrayList<>();
        for (Book book : books) {
            BookPageVO pageVO = buildBookPageVO(book, userBookRelationMap);
            pageVOS.add(pageVO);
        }
        
        // 返回
        return ListUtil.buildPage(pageVOS, pageDTO.getCurrent(), pageDTO.getSize());
    }
    
    private List<Book> filterSearch(List<Book> books, BookPageDTO pageDTO) {
        books = filterBookType(books, pageDTO.getBookType());
        return books;
    }
    
    private List<Book> filterBookType(List<Book> books, String bookType) {
        if (StrUtil.isBlank(bookType) || StrUtil.equals(bookType, "全部")) return books;
        
        return books.stream()
                .filter(x -> x.getType() != null && x.getType().contains(bookType))
                .collect(Collectors.toList());
    }
    
    private BookPageVO buildBookPageVO(Book book, Map<String, List<UserBookRelation>> userBookRelationMap) {
        BookPageVO pageVO = new BookPageVO();
        pageVO.setId(book.getId());
        pageVO.setName(book.getName());
        pageVO.setStatus(book.getStatus());
        pageVO.setType(book.getType());
        pageVO.setBookInfo(book.getBookInfo());
        pageVO.setAuthor(book.getAuthor());
        pageVO.setNumber(book.getNumber());
        pageVO.setCover(book.getCover());
        pageVO.setPublishers(book.getPublishers());
        
        pageVO.setSubscriptionStatus(false);
        pageVO.setCollectStatus(false);
        pageVO.setBorrowStatus(false);
        List<UserBookRelation> userBookRelations = userBookRelationMap.get(book.getId());
        if (CollUtil.isNotEmpty(userBookRelations)) {
            for (UserBookRelation userBookRelation : userBookRelations) {
                Integer subscriptionStatus = userBookRelation.getSubscriptionStatus();
                Integer collectStatus = userBookRelation.getCollectStatus();
                if (subscriptionStatus != null) {
                    pageVO.setSubscriptionStatus(subscriptionStatus == 1);
                }
                if (collectStatus != null) {
                    pageVO.setCollectStatus(collectStatus == 1);
                }
            }
            
            // 借阅状态
            UserBookRelation borrow = userBookRelations.stream()
                    .filter(x -> x.getBorrowStatus() != null && x.getBorrowStatus() == 1)
                    .findFirst().orElse(null);
            pageVO.setBorrowStatus(borrow != null);
        }
        
        return pageVO;
    }
    
    private List<Book> getPageData(BookPageDTO pageDTO) {
        return bookDao.lambdaQuery()
                .like(StringUtils.isNotBlank(pageDTO.getBookName()), Book::getName, pageDTO.getBookName())
                .orderByDesc(BaseUUID::getCreateTime)
                .list();
    }
    
    /**
     * 删除:书籍
     *
     * @param bookId
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void deleteBook(String bookId) {
        Book book = bookDao.getById(bookId);
        String cover = book.getCover();
        commonFileDao.removeById(cover);
        bookDao.removeById(bookId);
    }
    
    /**
     * 获取:书籍详情
     *
     * @param bookId
     * @return
     */
    @Override
    public BookVO bookDetail(String bookId) {
        Book book = bookDao.getById(bookId);
        BookVO bookVO = buildBookVO(book);
        return bookVO;
    }
    
    private BookVO buildBookVO(Book book) {
        BookVO vo = new BookVO();
        vo.setId(book.getId());
        vo.setName(book.getName());
        vo.setPublishers(book.getPublishers());
        vo.setAuthor(book.getAuthor());
        vo.setBookNo(book.getBookNo());
        vo.setBookInfo(book.getBookInfo());
        vo.setBookrack(book.getBookrack());
        vo.setType(book.getType());
        vo.setNumber(book.getNumber());
        vo.setCover(book.getCover());
        vo.setStatus(book.getStatus());
        vo.setAddedDate(book.getAddedDate());
        vo.setCreateTime(book.getCreateTime());
        vo.setUpdateTime(book.getUpdateTime());
        return vo;
    }
    
    /**
     * 修改:书籍
     *
     * @param updateDTO
     */
    @Override
    public void updateBook(BookUpdateDTO updateDTO) {
        // 处理书籍状态
        handleBookStatus(updateDTO);
        
        Book book = BeanUtil.copyProperties(updateDTO, Book.class);
        bookDao.updateById(book);
    }
    
    /**
     * 处理书籍状态
     *
     * @param updateDTO
     */
    private void handleBookStatus(BookUpdateDTO updateDTO) {
        Book book = bookDao.getById(updateDTO.getId());
        
        // 书籍预售 删除:借阅、上架消息
        if (updateDTO.getStatus() == 1) {
            userBookRelationDao.lambdaUpdate()
                    .eq(UserBookRelation::getBookId, updateDTO.getId())
                    .eq(UserBookRelation::getBorrowStatus, 1)
                    .remove();
            userBookMessageDao.lambdaUpdate()
                    .eq(UserBookMessage::getBookId, updateDTO.getId())
                    .remove();
        }
        
        // 书籍上架 发送:上架消息
        if (updateDTO.getStatus() == 2) {
            sendSubscriptionMessage(updateDTO.getId());
        }
        
        // 书籍下架 删除:订阅、借阅、上架消息消息
        if(updateDTO.getStatus() == 3){
            userBookRelationDao.lambdaUpdate()
                    .eq(UserBookRelation::getBookId, updateDTO.getId())
                    .eq(UserBookRelation::getSubscriptionStatus, 1)
                    .remove();
            userBookRelationDao.lambdaUpdate()
                    .eq(UserBookRelation::getBookId, updateDTO.getId())
                    .eq(UserBookRelation::getBorrowStatus, 1)
                    .remove();
            userBookMessageDao.lambdaUpdate()
                    .eq(UserBookMessage::getBookId, updateDTO.getId())
                    .remove();
        }
    }
    
    /**
     * 上架:书籍
     *
     * @param bookId
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public void addedBook(String bookId) {
        // 书籍上架
        bookDao.lambdaUpdate()
                .eq(BaseUUID::getId, bookId)
                .set(Book::getAddedDate, new Date())
                .set(Book::getStatus, 2)
                .update();
        
        // 给订阅的用户发送上架消息
        sendSubscriptionMessage(bookId);
    }
    
    private void sendSubscriptionMessage(String bookId) {
        List<UserBookRelation> relations = userBookRelationDao.listByBookIdAndSubscriptionStatus(bookId, 1);
        List<UserBookMessage> userBookMessages = new ArrayList<>();
        for (UserBookRelation relation : relations) {
            // 跳过已发送的
            UserBookMessage one = userBookMessageDao.getByUserIdAndBookId(bookId, relation.getUserId());
            if (one != null) {
                continue;
            }
            UserBookMessage userBookMessage = buildUserBookMessage(relation);
            userBookMessages.add(userBookMessage);
        }
        
        userBookMessageDao.saveBatch(userBookMessages);
    }
    
    private UserBookMessage buildUserBookMessage(UserBookRelation relation) {
        UserBookMessage message = new UserBookMessage();
        message.setUserId(relation.getUserId());
        message.setBookId(relation.getBookId());
        
        Book subscriptionBook = bookDao.getById(relation.getBookId());
        String msg = "您好，您订阅的由" + subscriptionBook.getAuthor() + "创作的书籍【" + subscriptionBook.getName() + "】已经上线，可以借阅了";
        message.setMessage(msg);
        
        message.setReadStatus(0);
        
        return message;
    }
}




















