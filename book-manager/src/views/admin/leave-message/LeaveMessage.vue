<template>
    <div class="leave-message-container">
        <LeaveMessageHeader class="header"/>
        <LeaveMessageDetail class="content"/>
    </div>
</template>

<script setup lang="js">
import LeaveMessageDetail from "@/views/user/leave-message/LeaveMessageDetail.vue";
import LeaveMessageHeader from "@/views/user/leave-message/LeaveMessageHeader.vue";
</script>

<style scoped lang="scss">
.leave-message-container{
    padding-top: 20px;

    .header{
        height: 120px;
    }

    .content{
        height: 600px;
    }
}
</style>
