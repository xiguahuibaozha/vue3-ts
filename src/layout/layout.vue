<template>
  <div class="layout">
    <AsideBar class="aside-bar"/>
    <div class="container">
      <HeaderBar/>
      <main>
        <transition>
          <router-view/>
        </transition>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import AsideBar from "./components/AsideBar.vue"
import HeaderBar from "./components/HeaderBar.vue"
import { useStore } from "vuex";

export default defineComponent({
  components:{
    AsideBar,
    HeaderBar
  },
  setup(){
    const { state } = useStore()

    return {
      sideWidth: computed(() => state.layout.sideWidth),
      timeout: computed(() => state.layout.timeout)
    }
  }
})
</script>

<style scoped lang="scss">
  .layout{
    width: 100%;
    display: flex;

    .aside-bar{
      transition: all v-bind('timeout');
      width: v-bind('sideWidth');
      height: 100vh;
      box-shadow: 0px 5px 10px $ZHENZHUHUI;
    }

    .container{
      transition: all v-bind('timeout');
      width: calc(100% - v-bind('sideWidth'));
    }
  }
</style>