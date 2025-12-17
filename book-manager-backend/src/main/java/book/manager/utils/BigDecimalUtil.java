package book.manager.utils;

import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * @author: zss
 * @date: 2023/10/12
 * @desc: BigDecimalUtil
 */
public class BigDecimalUtil {

    public static void main(String[] args) {
        // 创建BigDecimal对象
        BigDecimal num1 = new BigDecimal("10");
        BigDecimal num2 = new BigDecimal("5");
        BigDecimal num3 = new BigDecimal(3);

        // 相乘
        BigDecimal num4 = num1.multiply(num2);

        // 除法: num4/num3 保留两位小数，四舍五入
        BigDecimal num5 = num4.divide(num3, 2, RoundingMode.HALF_UP);

        // 相加
        BigDecimal num6 = num1.add(num2);

        // 减法
        BigDecimal num7 = num1.subtract(num2);

        // 比较大小: 1:num1>num2  0:num1=num2  -1:num1<num2
        int i = num1.compareTo(num2);

        // 设置小数点位数，并四舍五入
        // RoundingMode.DOWN不四舍五入，直接截取
        BigDecimal num8 = num1.setScale(0, RoundingMode.HALF_UP);

        // 去除结果的尾数0
        BigDecimal num9 = new BigDecimal("100.00").stripTrailingZeros();
        BigDecimal num10 = new BigDecimal("100.10").stripTrailingZeros();

        // 转化字符串时，避免科学计数:1.23E4
        String plainString = num10.toPlainString();
    }

}














