<template>
  <div class="aside">
    <div class="logo">
      <el-icon :size="30"><place /></el-icon>
      <span :style="{
        opacity: isCollapse?'0':'1'
      }">{{ title }}</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      :router="true"
    >
      <Menu v-for="(item,i) in otherRouters" :key="i" :item="item"></Menu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import { useStore } from "vuex"
import Menu from "./Menu.vue"
import { useRoute } from "vue-router"
import { otherRouters } from "@/router/routers"

export default defineComponent({
  components:{
    Menu
  },
  setup() {
    const route = useRoute()

    const defaultActive = ref<string>(route.path)

    watch(route, (val) => {
      if(!val.meta.hidden){
        defaultActive.value = route.path
      }
    })

    const { state } = useStore()

    return {
      title: computed(() => state.settings.title),
      isCollapse: computed(() => state.layout.showAsideMenu),
      timeout: computed(() => state.layout.timeout),
      defaultActive,
      otherRouters
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin menu{
  text-align: left;
  display: flex;
  align-items: center;
  color: $ZHENZHUHUI;

  .el-icon{
    margin-right: 15px;
  }
}

.aside {
  background-color: $ASIDEHUISE;
  color: $ZHENZHUHUI;

  .logo {
    font-family: "FZNHT";
    font-size: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 180px;

    span{
      transition: all v-bind('timeout');
      width: 80%;
    }
  }

  :deep(.el-menu){
    border: none;
    background-color: $ASIDEHUISE;
  }

  :deep(.el-sub-menu__title){
    @include menu;
  }
  :deep(.el-sub-menu__title:hover){
    background-color: $JINGYVHUI;
  }

  :deep(.el-menu-item:hover){
    background-color: $JINGYVHUI;
  }


  :deep(.el-menu-item){
    @include menu;
  }

  :deep(.is-active){
    color: $GULAN;
  }
}
</style>