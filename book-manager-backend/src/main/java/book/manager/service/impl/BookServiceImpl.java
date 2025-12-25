package book.manager.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import book.manager.dao.service.BookDao;
import book.manager.dao.service.CommonFileDao;
import book.manager.dao.service.UserBookRelationDao;
import book.manager.domain.common.BaseUUID;
import book.manager.domain.dto.BookAddDTO;
import book.manager.domain.dto.BookPageDTO;
import book.manager.domain.dto.BookUpdateDTO;
import book.manager.domain.entity.Book;
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
                Integer borrowStatus = userBookRelation.getBorrowStatus();
                if (subscriptionStatus != null) {
                    pageVO.setSubscriptionStatus(subscriptionStatus == 1);
                }
                if (collectStatus != null) {
                    pageVO.setCollectStatus(collectStatus == 1);
                }
                if (borrowStatus != null) {
                    pageVO.setBorrowStatus(borrowStatus == 1);
                }
            }
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
        Book book = BeanUtil.copyProperties(updateDTO, Book.class);
        bookDao.updateById(book);
    }
}




















