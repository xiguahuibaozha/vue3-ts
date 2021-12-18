<template>
  <!-- 当hidden为true时-隐藏菜单 -->
  <template v-if="!item?.meta?.hidden">
    <!-- 当菜单有两个及以上子菜单时 -->
    <el-sub-menu
      v-if="item?.children && item.children.length > 1"
      :index="item?.path"
    >
      <template #title>
        <el-icon :size="iconSize">
          <component :is="item?.meta?.icon ?? 'Guide'"></component>
        </el-icon>
        <span>{{ item?.meta?.title }}</span>
      </template>
      <Menu v-for="(child, i) in item?.children" :key="i" :item="child"></Menu>
    </el-sub-menu>
    <!-- 当菜单只有一个子菜单时 -->
    <Menu
      v-else-if="item?.children && item.children.length == 1"
      :item="item?.children[0]"
    ></Menu>
    <!-- 当菜单没有子菜单时 -->
    <el-menu-item v-else :index="item?.path" :route="item">
      <el-icon :size="iconSize">
        <component :is="item?.meta?.icon ?? 'Guide'"></component>
      </el-icon>
      <span>{{ item?.meta?.title }}</span>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Menu",
  props: {
    item: {
      type: Object,
    },
  },
  setup() {
    const { state } = useStore();

    return {
      iconSize: computed(() => state.layout.iconSize)
    };
  },
});
</script>

<style lang="scss" scoped>
.menu {
}
</style>