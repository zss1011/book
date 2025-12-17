<template>
    <div class="message-container">
        <LeaveMessageHeader/>
        <LeaveMessageDetail/>
    </div>
</template>

<script setup lang="js">
import LeaveMessageDetail from "@/views/user/leave-message/LeaveMessageDetail.vue";
import LeaveMessageHeader from "@/views/user/leave-message/LeaveMessageHeader.vue";

</script>

<style scoped lang="scss">
.message-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
</style>
