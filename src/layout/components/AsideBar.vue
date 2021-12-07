<template>
  <div class="aside">
    <div class="logo">
      <el-icon :size="30"><place /></el-icon>
      <span v-if="!isCollapse">{{ title }}</span>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon :size="iconSize">
            <component :is="'location'"></component>
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
        <el-menu-item index="1-3">item three</el-menu-item>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3">
        <el-icon :size="iconSize"><document /></el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon :size="iconSize"><setting /></el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const { state } = useStore();

    const handleOpen = (key:string, keyPath:string[]) => {
      console.log(key, keyPath)
    }
    const handleClose = (key:string, keyPath:string[]) => {
      console.log(key, keyPath)
    }

    return {
      title: computed(() => state.settings.title),
      isCollapse: computed(() => state.layout.showAsideMenu),
      iconSize: computed(() => state.layout.iconSize),
      handleOpen,
      handleClose
    };
  },
});
</script>

<style lang="scss" scoped>
@mixin menu{
  text-align: left;
  display: flex;
  align-items: center;

  .el-icon{
    margin-right: 15px;
  }
}

.aside {
  .logo {
    font-family: "FZNHT";
    font-size: 20px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  :deep(.el-menu){
    border: none;
  }

  :deep(.el-sub-menu__title){
    @include menu;
  }

  :deep(.el-menu-item){
    @include menu;
  }
}
</style>