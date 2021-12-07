<template>
  <div class="home">
    <div style="text-align:left;padding:20px 30px;">
      <span class="logo">{{ settings.title }}</span>
    </div>

    <div class="center logo">
      <div ref="scene">
        <div data-depth="0.5">
          <h1>{{ settings.title }}</h1>
        </div>
      </div>
      <el-form :model="loginForm">
        <el-form-item>
          <el-input v-model="loginForm.userName" placeholder="用户名">
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
</template>

<script>
import { defineComponent, onMounted, reactive, ref } from "vue";
import Parallax from "parallax-js";
import { useStore } from "vuex";
import { Lock, Avatar } from "@element-plus/icons";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    Lock,
    Avatar,
  },
  setup() {
    const scene = ref(null);

    const loginForm = reactive({ userName: null, password: null });

    onMounted(() => {
      new Parallax(scene.value, {
        relativeInput: true,
      });
    });

    const { state,dispatch } = useStore();

    const router = useRouter()

    const onSubmit = () => {
      dispatch("app/getMenuList")
      router.push("/menu")
    }

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
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: url("~@/assets/background.png");
  background-size: cover;
  background-position: center;

  .logo {
    font-family: "FZNHT";
    font-size: 28px;
    cursor: pointer;
  }
  
  .center {
    width: 30%;
    height: 400px;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    margin: auto;

    :deep(.el-input__prefix){
      left: 10px;
      height: 32px;
      top: 0;
      bottom: 0;
      margin: auto;
    }

    :deep(.el-input__inner){
      height: 50px;
      font-size: 18px;
      padding-left: 40px;
      background: rgba($color: white, $alpha: 0.9);
    }

    :deep(.el-button){
      width: 100%;
      opacity: 0.9;
    }
  }
}
</style>