<template>
  <div class="header">
    <div class="header-left">
      <el-icon :size="25" v-if="isCollapse" @click="isShowAsideMenu"><expand /></el-icon>
      <el-icon :size="25" v-else @click="isShowAsideMenu"><Fold /></el-icon>

      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in breadcrumbList" :key="item">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <div class="info">
          <el-avatar :size="30" :src="avatar"></el-avatar>
          <span class="name">{{ userInfo.username }}</span>

          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </div>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="passwordUpdate">修改密码</el-dropdown-item>
          <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog v-model="updatePasswordDialogVisible" title="修改密码" width="300px">
      <el-form :model="passWordForm">
        <el-form-item label="旧密码">
          <el-input
            v-model="passWordForm.oldPassword"
            placeholder="请输入"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            v-model="passWordForm.newPassword"
            placeholder="请输入"
            type="password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="rightChangePassword">确认</el-button>
          <el-button @click="noChangePassword">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import avatar from "@/assets/avatar.png";
import { passwordUpdate } from "@/api/app";

export default defineComponent({
  setup() {
    const route = useRoute();

    let breadcrumbList = ref<(string | undefined)[]>([]);

    watchEffect(() => {
      breadcrumbList.value = route.matched
        .map((item) => {
          return item.meta?.title as string | undefined;
        })
        .filter((item) => {
          return item;
        });
    });

    const { state, dispatch } = useStore();

    const isCollapse = computed(() => state.layout.showAsideMenu);

    const isShowAsideMenu = () => {
      dispatch("layout/changeSideWidth", isCollapse.value);
    };

    const updatePasswordDialogVisible = ref(false);

    // 修改密码 form
    const passWordForm = ref({
      newPassword: null,
      oldPassword: null,
    });

    // 确认修改密码
    const rightChangePassword = () => {
      passwordUpdate(passWordForm.value).then(() => {
        updatePasswordDialogVisible.value = false;
        passWordForm.value = {
          newPassword: null,
          oldPassword: null,
        };
      });
    };

    // 取消修改密码
    const noChangePassword = () => {
      passWordForm.value = {
        newPassword: null,
        oldPassword: null,
      };
      updatePasswordDialogVisible.value = false;
    };

    // app store相关
    const handleCommand = (command: string) => {
      if (command == "passwordUpdate") {
        updatePasswordDialogVisible.value = true;
      } else if (command == "loginOut") {
        dispatch(`app/${command}`);
      }
    };

    return {
      isCollapse,
      isShowAsideMenu,
      avatar,
      userInfo: state.app.userInfo,
      breadcrumbList,
      handleCommand,
      updatePasswordDialogVisible,
      passWordForm,
      rightChangePassword,
      noChangePassword,
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  box-shadow: 3px 5px 4px $BORDERHUI;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  justify-content: space-between;

  &-left {
    display: flex;
    align-items: center;

    :deep(.el-breadcrumb) {
      margin-left: 20px;
    }
  }

  :deep(.el-icon) {
    cursor: pointer;
  }

  .info {
    display: flex;
    align-items: center;

    .name {
      margin-left: 10px;
      font-size: 25px;
      font-family: "FZNHT";
    }

    .el-icon--right {
      margin-left: 10px;
    }
  }
}
</style>
