<template>
  <el-upload
    class="avatar-uploader"
    name="files"
    :action="actionUrl"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :on-error="handleAvatarError"
  >
    <!-- <video></video> -->
    <img v-if="type == 'image' && resultUrl" :src="resultUrl" class="avatar" />
    <el-icon v-loading="loading" v-else class="avatar-uploader-icon"><plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { useStore } from "vuex";

const loading = ref(false);
const resultUrl = ref();

const { state } = useStore();
const actionUrl = state.settings.baseUrl + `/other/fdfs`;
const imgUrl = state.settings.imgUrl;

const props = defineProps({
  type: {
    //上传的类型 image图片  video视频
    type: String,
    default: "image",
  },
  defaultUrl: {
    type: String
  }
});

watch(() => props.defaultUrl, val => {
  if(val && /^http(|s)/.test(val)){
    resultUrl.value = val
  }else {
    resultUrl.value = `${imgUrl}/${val}`
  }
})

const emit = defineEmits(["success"]);

const handleAvatarSuccess = (response: MyResponse, file: File, fileList: File[]) => {
  loading.value = false;
  if (response.code == 200 && response.data.length > 0) {
    resultUrl.value = `${imgUrl}/${response.data[0].url}`;
    emit("success", response, file, fileList);
  } else {
    ElMessage({
      message: "文件上传出错了",
      type: "error",
    });
  }
};

const handleAvatarError = () => {
  loading.value = false;
  ElMessage({
    message: "文件上传出错了",
    type: "error",
  });
};

const beforeAvatarUpload = (file: File) => {
  if (file.type.includes(props.type)) {
    loading.value = true;
    return true;
  } else {
    ElMessage({
      message: "上传文件格式错误",
      type: "warning",
    });
  }
  return false;
};
</script>
<style lang="scss" scoped>
.avatar-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 178px;
  height: 178px;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader-icon svg {
  margin-top: 74px; /* (178px - 28px) / 2 - 1px */
}
.avatar{
  width: 178px;
  height: 178px;
  display: block;
}
</style>
