package book.manager.utils;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

/**
 * @author: zss
 * @date: 2023/4/27
 * @desc: Date工具类
 */
public class DateUtil {

    /**
     * Date -> String
     *
     * @param date
     * @param pattern
     * @return
     */
    public static String format(Date date, String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern);
        return sdf.format(date);
    }

    /**
     * String -> Date
     *
     * @param date
     * @return
     */
    public static Date parse(String date, String pattern) {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(pattern);
            return sdf.parse(date);
        } catch (ParseException e) {
            throw new RuntimeException("字符串转时间失败:String:" + date + ",pattern:yyyy-MM-dd HH:mm:ss");
        }
    }

    /**
     * 获取前面时间
     *
     * @param date
     * @param time
     * @param unit
     * @return
     */
    public static Date beforeTime(Date date, long time, TimeUnit unit) {
        long milliseconds = 0L;
        if (unit == TimeUnit.MILLISECONDS) {
            milliseconds = time;
        }
        if (unit == TimeUnit.SECONDS) {
            milliseconds = time * 1000;
        }
        if (unit == TimeUnit.MINUTES) {
            milliseconds = time * 1000 * 60;
        }
        if (unit == TimeUnit.HOURS) {
            milliseconds = time * 1000 * 60 * 60;
        }
        if (unit == TimeUnit.DAYS) {
            milliseconds = time * 1000 * 60 * 60 * 24;
        }
        return new Date(date.getTime() - milliseconds);
    }

    /**
     * 获取后面时间
     *
     * @param date
     * @param time
     * @param unit
     * @return
     */
    public static Date afterTime(Date date, long time, TimeUnit unit) {
        long milliseconds = 0L;
        if (unit == TimeUnit.MILLISECONDS) {
            milliseconds = time;
        }
        if (unit == TimeUnit.SECONDS) {
            milliseconds = time * 1000;
        }
        if (unit == TimeUnit.MINUTES) {
            milliseconds = time * 1000 * 60;
        }
        if (unit == TimeUnit.HOURS) {
            milliseconds = time * 1000 * 60 * 60;
        }
        if (unit == TimeUnit.DAYS) {
            milliseconds = time * 1000 * 60 * 60 * 24;
        }
        return new Date(date.getTime() + milliseconds);
    }

    /**
     * 获取本日、本周、本月、本年的时间范围
     *
     * @return
     */
    public static TimeScope getTimeScope() {
        LocalDate day = LocalDate.now();
        LocalDateTime startTimeDay = LocalDateTime.of(day, LocalTime.MIN);
        LocalDateTime endTimeDay = LocalDateTime.of(day, LocalTime.MAX);

        LocalDate firstDayOfWeek = day.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate lastDayOfWeek = day.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));
        LocalDateTime startTimeWeek = LocalDateTime.of(firstDayOfWeek, LocalTime.MIN);
        LocalDateTime endTimeWeek = LocalDateTime.of(lastDayOfWeek, LocalTime.MAX);

        LocalDate firstDayOfMonth = day.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate lastDayOfMonth = day.with(TemporalAdjusters.lastDayOfMonth());
        LocalDateTime startTimeMonth = LocalDateTime.of(firstDayOfMonth, LocalTime.MIN);
        LocalDateTime endTimeMonth = LocalDateTime.of(lastDayOfMonth, LocalTime.MAX);

        LocalDate firstDayOfYear = day.with(TemporalAdjusters.firstDayOfYear());
        LocalDate lastDayOfYear = day.with(TemporalAdjusters.lastDayOfYear());
        LocalDateTime startTimeYear = LocalDateTime.of(firstDayOfYear, LocalTime.MIN);
        LocalDateTime endTimeYear = LocalDateTime.of(lastDayOfYear, LocalTime.MAX);

        TimeScope timeScope = new TimeScope();
        timeScope.setStartTimeDay(toMillis(startTimeDay));
        timeScope.setEndTimeDay(toMillis(endTimeDay));

        timeScope.setStartTimeWeek(toMillis(startTimeWeek));
        timeScope.setEndTimeWeek(toMillis(endTimeWeek));

        timeScope.setStartTimeMonth(toMillis(startTimeMonth));
        timeScope.setEndTimeMonth(toMillis(endTimeMonth));

        timeScope.setStartTimeYear(toMillis(startTimeYear));
        timeScope.setEndTimeYear(toMillis(endTimeYear));
        return timeScope;
    }

    /**
     * 将LocalDateTime时间转成毫秒
     *
     * @param time
     * @return
     */
    public static long toMillis(LocalDateTime time) {
        // 转换LocalDateTime到ZonedDateTime，使用系统默认时区
        ZonedDateTime zonedDateTime = time.atZone(ZoneId.systemDefault());
        // 转换ZonedDateTime到Instant
        Instant instant = zonedDateTime.toInstant();
        // 从Instant获取毫秒值
        long millis = instant.toEpochMilli();
        return millis;
    }

    /**
     * 时间范围
     */
    @Data
    public static class TimeScope {
        @ApiModelProperty("本日:开始时间")
        private long startTimeDay;
        @ApiModelProperty("本日:结束时间")
        private long endTimeDay;

        @ApiModelProperty("本周:开始时间")
        private long startTimeWeek;
        @ApiModelProperty("本周:结束时间")
        private long endTimeWeek;

        @ApiModelProperty("本月:开始时间")
        private long startTimeMonth;
        @ApiModelProperty("本月:结束时间")
        private long endTimeMonth;

        @ApiModelProperty("本年:开始时间")
        private long startTimeYear;
        @ApiModelProperty("本年:结束时间")
        private long endTimeYear;
    }

    /**
     * 根据入参获取本周每天的开始时间与结束时间
     *
     * @return
     */
    public static List<DateScope> WeekDays(Date date) {
        LocalDate day = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate startOfWeek = day.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        LocalDate endOfWeek = day.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY));

        List<DateScope> dateScopes = new ArrayList<>();
        LocalDate currentDay = startOfWeek;
        while (!currentDay.isAfter(endOfWeek)) {
            LocalDateTime startOfDay = LocalDateTime.of(currentDay, LocalTime.MIN);
            LocalDateTime endOfDay = LocalDateTime.of(currentDay, LocalTime.MAX);

            DateScope scopeDay = new DateScope();
            scopeDay.setStartTime(toMillis(startOfDay));
            scopeDay.setEndTime(toMillis(endOfDay));
            dateScopes.add(scopeDay);

            currentDay = currentDay.plusDays(1);
        }

        return dateScopes;
    }

    /**
     * 根据入参获取本月每天的开始时间与结束时间
     *
     * @param date
     */
    public static List<DateScope> monthDays(Date date) {
        LocalDate day = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate startOfMonth = day.with(TemporalAdjusters.firstDayOfMonth());
        LocalDate endOfMonth = day.with(TemporalAdjusters.lastDayOfMonth());

        List<DateScope> dateScopes = new ArrayList<>();
        LocalDate currentDay = startOfMonth;
        while (!currentDay.isAfter(endOfMonth)) {
            LocalDateTime startOfDay = LocalDateTime.of(currentDay, LocalTime.MIN);
            LocalDateTime endOfDay = LocalDateTime.of(currentDay, LocalTime.MAX);

            DateScope dateScope = new DateScope();
            dateScope.setStartTime(toMillis(startOfDay));
            dateScope.setEndTime(toMillis(endOfDay));
            dateScopes.add(dateScope);

            currentDay = currentDay.plusDays(1);
        }

        return dateScopes;
    }


    /**
     * 根据入参获取本年每月的开始时间与结束时间
     *
     * @param date
     * @return
     */
    public static List<DateScope> yearMonths(Date date) {
        LocalDate day = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate startOfYear = day.with(TemporalAdjusters.firstDayOfYear());
        LocalDate endOfYear = day.with(TemporalAdjusters.lastDayOfYear());

        List<DateScope> dateScopes = new ArrayList<>();
        LocalDate currentMonth = startOfYear;
        while (!currentMonth.isAfter(endOfYear)) {
            LocalDate firstDayOfMonth = currentMonth.with(TemporalAdjusters.firstDayOfMonth());
            LocalDate lastDayOfMonth = currentMonth.with(TemporalAdjusters.lastDayOfMonth());
            LocalDateTime startOfMonth = LocalDateTime.of(firstDayOfMonth, LocalTime.MIN);
            LocalDateTime endOfMonth = LocalDateTime.of(lastDayOfMonth, LocalTime.MAX);

            DateScope dateScope = new DateScope();
            dateScope.setStartTime(toMillis(startOfMonth));
            dateScope.setEndTime(toMillis(endOfMonth));
            dateScopes.add(dateScope);

            currentMonth = currentMonth.plusMonths(1);
        }

        return dateScopes;
    }

    @Data
    @ApiModel("日期时间范围")
    public static class DateScope {
        @ApiModelProperty("开始时间")
        private long startTime;
        @ApiModelProperty("结束时间")
        private long endTime;
    }

    /**
     * 根据出生日期的毫秒值计算年龄
     *
     * @param birthTimeMillis 出生日期的毫秒值
     */
    public static int getAge(long birthTimeMillis) {
        if (birthTimeMillis <= 0) {
            throw new IllegalArgumentException("出生日期毫秒值无效");
        }

        LocalDate birthDate = Instant.ofEpochMilli(birthTimeMillis)
                .atZone(ZoneId.systemDefault())
                .toLocalDate();

        LocalDate currentDate = LocalDate.now();
        if (birthDate != null) {
            return Period.between(birthDate, currentDate).getYears();
        } else {
            return 0;
        }
    }

    /**
     * 获取今日剩余秒数
     *
     * @return
     */
    public static long getTodayEndSeconds() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime endOfDay = LocalDateTime.of(now.toLocalDate(), LocalTime.MAX);

        Duration duration = Duration.between(now, endOfDay);
        return duration.getSeconds();
    }

    /**
     * LocalDateTime -> Date
     *
     * @param localDateTime
     * @return
     */
    public static Date toDate(LocalDateTime localDateTime) {
        ZonedDateTime zonedDateTime = localDateTime.atZone(ZoneId.systemDefault());
        Instant instant = zonedDateTime.toInstant();
        Date date = Date.from(instant);
        return date;
    }

    /**
     * Date -> LocalDateTime
     *
     * @param date
     * @return
     */
    public static LocalDateTime toLocalDateTime(Date date) {
        Instant instant = date.toInstant();
        LocalDateTime localDateTime = LocalDateTime.ofInstant(instant, ZoneId.systemDefault());
        return localDateTime;
    }

}
