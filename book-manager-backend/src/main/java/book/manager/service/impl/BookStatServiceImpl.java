package book.manager.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import book.manager.dao.service.BookDao;
import book.manager.dao.service.UserBookRelationDao;
import book.manager.domain.entity.Book;
import book.manager.domain.entity.UserBookRelation;
import book.manager.domain.vo.BookStatBaseInfoVO;
import book.manager.service.BookStatService;
import com.google.common.collect.Lists;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

/**
 * @author: zss
 * @date: 2026/1/12
 * @desc: 书籍统计
 */
@Slf4j
@Service
public class BookStatServiceImpl implements BookStatService {
    
    @Resource
    private BookDao bookDao;
    @Resource
    private UserBookRelationDao userBookRelationDao;
    
    /**
     * 书籍情况统计:预售、上架、借阅、收藏
     *
     * @return
     */
    @Override
    public List<BookStatBaseInfoVO> bookStatBaseInfo() {
        Long presell = bookDao.lambdaQuery()
                .eq(Book::getStatus, 1)
                .count();
        Long added = bookDao.lambdaQuery()
                .eq(Book::getStatus, 2)
                .count();
        Long borrow = userBookRelationDao.lambdaQuery()
                .eq(UserBookRelation::getBorrowStatus, 1)
                .isNull(UserBookRelation::getReturnTime)
                .count();
        Long collect = userBookRelationDao.lambdaQuery()
                .eq(UserBookRelation::getCollectStatus, 1)
                .isNull(UserBookRelation::getReturnTime)
                .count();
        
        BigDecimal total = BigDecimal.ZERO;
        total = total.add(new BigDecimal(presell.toString()))
                .add(new BigDecimal(added.toString()))
                .add(new BigDecimal(borrow.toString()))
                .add(new BigDecimal(collect.toString()));
        
        BigDecimal presellVal = new BigDecimal(presell.toString()).divide(total, 2, RoundingMode.HALF_UP);
        BigDecimal addedVal = new BigDecimal(added.toString()).divide(total, 2, RoundingMode.HALF_UP);
        BigDecimal borrowVal = new BigDecimal(borrow.toString()).divide(total, 2, RoundingMode.HALF_UP);
        BigDecimal collectVal = BigDecimal.ONE.subtract(presellVal).subtract(addedVal).subtract(borrowVal);
        
        BookStatBaseInfoVO vo1 = new BookStatBaseInfoVO();
        vo1.setName("预售");
        vo1.setValue(presellVal);
        BookStatBaseInfoVO vo2 = new BookStatBaseInfoVO();
        vo2.setName("上架");
        vo2.setValue(addedVal);
        BookStatBaseInfoVO vo3 = new BookStatBaseInfoVO();
        vo3.setName("借阅");
        vo3.setValue(borrowVal);
        BookStatBaseInfoVO vo4 = new BookStatBaseInfoVO();
        vo4.setName("收藏");
        vo4.setValue(collectVal);
        
        List<BookStatBaseInfoVO> vos = Lists.newArrayList(vo1, vo2, vo3, vo4);
        return vos;
    }
}
