<template>
  <div class="layout">
    <AsideBar class="aside-bar" />
    <div class="container">
      <HeaderBar class="header" />
      <main>
        <router-view v-slot="{ Component }">
          <component :is="Component"></component>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import AsideBar from "./components/AsideBar.vue";
import HeaderBar from "./components/HeaderBar.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    AsideBar,
    HeaderBar,
  },
  setup() {
    const { state, dispatch } = useStore();

    if(window.innerWidth <= 500){
      dispatch("layout/changeSideWidth", false);
    }

    window.addEventListener("resize", () => {
      if (window.innerWidth <= 500) {
        dispatch("layout/changeSideWidth", false);
      } else if (window.innerWidth >= 900) {
        dispatch("layout/changeSideWidth", true);
      }
    });

    return {
      sideWidth: computed(() => state.layout.sideWidth),
      timeout: computed(() => state.layout.timeout),
    };
  },
});
</script>

<style scoped lang="scss">
.layout {
  width: 100%;
  display: flex;

  .aside-bar {
    transition: all v-bind(timeout);
    width: v-bind(sideWidth);
    height: 100vh;
    box-shadow: 0px 5px 10px $ZHENZHUHUI;
    overflow: hidden;
  }

  .container {
    transition: all v-bind(timeout);
    width: calc(100% - v-bind(sideWidth));
    background-color: $DISEHUI;
    display: flex;
    flex-direction: column;

    .header {
      padding: 10px;
    }

    main {
      height: calc(100vh - 70px);
      overflow: auto;
      padding: 20px;
      padding-bottom: 0px;
      text-align: left;

      .fade-enter-active,
      .fade-leave-active {
        transition: opacity 0.4s;
      }
      .fade-enter,
      .fade-leave-active {
        opacity: 0;
      }
    }
  }
}
</style>
