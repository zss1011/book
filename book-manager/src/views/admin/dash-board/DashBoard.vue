<template>
    <div class="dashBoard-container">
        <div class="top">
            <div class="left">
                <div class="tip-chart-wrapper">
                    <PipChart />
                </div>
            </div>
            <div class="right">
                <UserChart style="transform: translateY(30px)" />
            </div>
        </div>
        <div class="middle">最新公告</div>
        <div class="bottom">
            <div class="left">
                <div class="notice-wrapper">
                    <div v-for="(item,idx) in notice" :key="idx" class="notice">
                        <div style="cursor:pointer" @click="handleNoticeDetail(item.id)">{{ item.name }}</div>
                        <div style="cursor:pointer" @click="handleNoticeDetail(item.id)">时间：{{ item.desc }}</div>
                    </div>
                </div>
            </div>
            <div class="right">
                <BookChart />
            </div>
        </div>
    </div>
</template>

<script setup lang="js">
import PipChart from "@/views/admin/dash-board/TipChart.vue";
import UserChart from "@/views/admin/dash-board/UserChart.vue";
import {onMounted, ref} from "vue";
import BookChart from "@/views/admin/dash-board/BookChart.vue";
import {richTextPageApi} from "@/api/richTextApi.js";
import {useRouter} from "vue-router";

const router = useRouter()

let notice = ref([])

onMounted(async () => {
    const pageDTO = {
        current: 1,
        size: 10
    }
    const res = await richTextPageApi(pageDTO);
    for (let i = 0; i < res.data.records.length; i++) {
        let data = res.data.records[i]
        notice.value.push({
            id: data.id,
            name: data.bookName,
            desc: data.createTime
        })
        if (i === 3) {
            break
        }
    }
})

// 获取公告详情
const handleNoticeDetail = async (id) => {
    const url = router.resolve({
        path: '/notice/detail',
        query: { id: id }
    });
    window.open(url.href, '_blank');
}

</script>

<style scoped lang="scss">
.dashBoard-container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .top {
        flex: 1;
        min-width: 0;
        display: flex;

        .left {
            flex: 1.2;
            min-width: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .tip-chart-wrapper {
                width: 90%;
                height: 90%;
                background: rgb(233, 244, 253);
            }
        }

        .right {
            flex: 2;
            min-width: 0;
        }
    }

    .middle {
        height: 60px;
        line-height: 60px;
        font-weight: bolder;
        font-size: 24px;
        padding-left: 26px;
    }

    .bottom {
        flex: 1;
        min-width: 0;
        display: flex;

        .left {
            flex: 1.2;
            min-width: 0;
            display: flex;
            justify-content: center;
            align-items: center;

            .notice-wrapper {
                width: 90%;
                height: 90%;
                background: rgb(233, 244, 253);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 30px;
                box-sizing: border-box;
                font-size: 15px;
                color: #1e1d1d;

                .notice {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
            }
        }

        .right {
            flex: 2;
            min-width: 0;
        }
    }
}
</style>
