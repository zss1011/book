<template>
    <template v-for="menu in menus" :key="menu.path">
        <!--没有子路由-->
        <template v-if="!menu.children">
            <el-menu-item :index="menu.path" @click="handleRoute(menu)">
                <template #title>
                    <el-icon>
                        <component :is="menu.meta.icon" />
                    </el-icon>
                    <span>{{ menu.meta.bookName }}</span>
                </template>
            </el-menu-item>
        </template>
        <!--有子路由-->
        <template v-if="menu.children && menu.children.length">
            <el-sub-menu :index="menu.path">
                <template #title>
                    <el-icon>
                        <component :is="menu.meta.icon" />
                    </el-icon>
                    <span>{{ menu.meta.bookName }}</span>
                </template>
                <!--需要递归调用-->
                <SubMenu v-model:menus="menu.children" />
            </el-sub-menu>
        </template>
    </template>
</template>

<script setup lang="js">
import SubMenu from "@/views/admin/layout/sidebar/SubMenu.vue";
import {useRouter} from "vue-router";

const {menus} = defineProps(["menus"]);

const router = useRouter();
const handleRoute = (menu) => {
    router.push(menu.meta.path)
}

// 设置组件name
defineOptions({
    name: 'SubMenu'
})
</script>

<style scoped lang="scss">
</style>
