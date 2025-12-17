<template>
    <div class="category-chart-wrapper">
        <div class="category-chart-container" id="category-chart-container" style="width: 100%; height: 100%" />
        <div class="select">
            <el-select v-model="dateRange" @change="onChange" size="default">
                <el-option label="7天内" value="7"></el-option>
                <el-option label="30天内" value="30"></el-option>
                <el-option label="60天内" value="60"></el-option>
            </el-select>
        </div>
    </div>

</template>

<script setup lang="js">
import * as echarts from 'echarts';
import {onMounted, ref} from "vue";

// select逻辑
const dateRange = ref('7天内');
const onChange = (val) => {
    console.log(val)
}

onMounted(() => {
    let chartDom = document.getElementById('category-chart-container');
    let myChart = echarts.init(chartDom);
    let option;
    option = {
        xAxis: {
            type: 'category',
            data: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07']
        },
        yAxis: {
            type: 'value'
        },
        title: {
            text: '用户数',
            left: '30px',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                smooth: true
            }
        ]
    };
    option && myChart.setOption(option);
})
</script>

<style scoped lang="scss">
.category-chart-wrapper{
    width: 100%;
    height: 100%;
    position: relative;

    .select{
        width: 100px;
        position: absolute;
        top: 10px;
        right: 30px;
    }
}
</style>
