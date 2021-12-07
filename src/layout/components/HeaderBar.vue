<template>
  <div class="header">
      <el-icon :size="25" v-if="isCollapse" @click="isShowAsideMenu"><expand /></el-icon>
      <el-icon :size="25" v-else @click="isShowAsideMenu"><Fold /></el-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex'

export default defineComponent({
  setup() {
    console.log(useStore())
    const { state,dispatch } = useStore()

    const isCollapse = computed(() => state.layout.showAsideMenu)

    const isShowAsideMenu = () => {
      dispatch("changeState",['layout.showAsideMenu',!isCollapse.value])
      dispatch("layout/changeSideWidth",isCollapse.value)
    }

    return {
      isCollapse,
      isShowAsideMenu
    }
  }
})
</script>

<style lang="scss" scoped>
  .header{
    height: 50px;
    box-shadow: 10px 5px 10px $ZHENZHUHUI;
    display: flex;
    align-items: center;
    padding: 0px 10px;

    :deep(.el-icon){
      cursor: pointer;
    }
  }
</style>