<template>
    <div class="pie-chart" id="pie" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="js">
import * as echarts from 'echarts';
import {onMounted} from "vue";
import {bookStatBaseInfoApi} from "@/api/bookStat.js";

// 读取统计数据
const fetchBookStatData = async () => {
    const res = await bookStatBaseInfoApi()
    data = res.data
}

// 预售、上架、借阅、收藏
let data = [
    {value: 0, name: '预售'},
    {value: 0, name: '上架'},
    {value: 0, name: '借阅'},
    {value: 0, name: '收藏'},
]

onMounted(async () => {
    // 读取统计数据
    await fetchBookStatData();

    let chartDom = document.getElementById('pie');
    let myChart = echarts.init(chartDom);
    myChart.setOption({
        title: {
            left: 'center',
            text: '基础数据'
        },
        tooltip: {
            trigger: 'item',
            show: false,
        },
        color: ['#91cc75', '#5470c6', '#fac858', '#ee6666', '#73c0de'],
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: '50%',
                data: data,
                label: {
                    show: true,
                    formatter: '{b} ({d}%)'
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    })
})

</script>

<style scoped lang="scss">
</style>
