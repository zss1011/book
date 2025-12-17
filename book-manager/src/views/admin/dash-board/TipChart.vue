<template>
    <div class="pie-chart" id="pie" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="js">
import * as echarts from 'echarts';
import {onMounted} from "vue";

onMounted(() => {
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
                data: [
                    { value: 3.12, name: '3.12%' },
                    { value: 34.38, name: '35.38%' },
                    { value: 34.38, name: '33.38%' },
                    { value: 28.12, name: '28.12%' },
                ],
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
