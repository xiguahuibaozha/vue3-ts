<template>
  <div class="home">
    <div class="home-left">
      <div style="text-align: left; padding: 20px 30px">
        <span class="logo">{{ settings.title }}</span>
      </div>
    </div>
    <div class="hone-right">
      <div class="center logo">
        <div ref="scene">
          <div data-depth="0.5">
            <h1>{{ settings.title }}</h1>
          </div>
        </div>
        <el-form :model="loginForm">
          <el-form-item>
            <el-input v-model="loginForm.username" placeholder="用户名">
              <template #prefix>
                <el-icon :size="20"><Avatar /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="loginForm.password"
              placeholder="密码"
              type="password"
            >
              <template #prefix>
                <el-icon :size="20"><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Parallax from "parallax-js";
import { useStore } from "vuex";
import { Lock, Avatar } from "@element-plus/icons";

export default defineComponent({
  components: {
    Lock,
    Avatar,
  },
  setup() {
    const scene = ref(null);

    const loginForm = ref({ username: "admin", password: "admin" });

    onMounted(() => {
      new Parallax(scene.value, {
        relativeInput: true,
      });
    });

    const { state, dispatch } = useStore();

    const onSubmit = () => {
      dispatch("app/login",loginForm.value)
    };

    return {
      loginForm,
      scene,
      settings: state.settings,
      onSubmit
    };
  },
});
</script>

<style lang="scss" scoped>
.home {
  display: flex;

  .logo {
    font-family: "FZNHT";
    font-size: 28px;
    cursor: pointer;
  }
}

.home-left {
  height: 100vh;
  width: 65%;
  background: url("~@/assets/background.png");
  background-size: cover;
  background-position: center;
}

.hone-right {
  width: 35%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;

  .center {
    height: 400px;
    width: 80%;

    :deep(.el-input__prefix) {
      left: 10px;
      height: 32px;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    :deep(.el-input__inner) {
      height: 50px;
      font-size: 18px;
      padding-left: 40px;
      background: rgba($color: white, $alpha: 0.9);
    }

    :deep(.el-button) {
      width: 100%;
      opacity: 0.9;
    }
  }
}
</style>