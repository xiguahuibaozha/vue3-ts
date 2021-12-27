<template>
  <div class="file-upload">
    <el-upload
      class="avatar-uploader"
      :class="type == 'video' ? '' : 'image-uploader'"
      name="files"
      :action="actionUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-error="handleAvatarError"
      v-loading="loading"
    >
      <el-image
        v-if="type == 'image' && resultUrl"
        :src="resultUrl"
        fit="cover"
        class="avatar"
      ></el-image>
      <!-- 所有视频都会被转为MP4 -->
      <video
        v-else-if="type == 'video' && resultUrl"
        controls
        :src="resultUrl"
        :poster="poster"
        class="video"
      ></video>
      <!-- <img v-if="type == 'image' && resultUrl" :src="resultUrl" class="avatar" /> -->
      <el-icon v-else class="avatar-uploader-icon"><plus /></el-icon>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import { useStore } from "vuex";
import { getUrl } from "@/util/utils"

const loading = ref(false);

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
    type: String,
    default: "",
  },
});

// const getUrl = (result: string): string => {
//   if (Object.keys(JSONParse(result)).length > 0) {
//     const resultObj = JSONParse(result)
//     if (/^http(|s)/.test(resultObj.url)) {
//       return resultObj.url;
//     } else {
//       return `${imgUrl}/${resultObj.url}`;
//     }
//   }else {
//     return result
//   }
// };

const resultUrl = ref(getUrl(props.defaultUrl));

watch(
  () => props.defaultUrl,
  (val) => {
    resultUrl.value = getUrl(val);
  }
);

// 设置data默认值请调用 setData方法
defineExpose({
  setData(result: any) {
    console.log(getUrl(result))
    resultUrl.value = getUrl(result);
  },
});

const emit = defineEmits(["success"]);

const poster = ref();

const handleAvatarSuccess = (response: MyResponse, file: File, fileList: File[]) => {
  loading.value = false;
  if (response.code == 200 && response.data.length > 0) {
    if (props.type == "video") {
      poster.value = `${imgUrl}/${response.data[0].images}`;
    }

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
.file-upload {
  display: inline-block;
}
.avatar-uploader {
  width: 100%;
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
:deep(.el-upload) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.avatar-uploader:hover {
  border-color: #409eff;
}
.avatar {
  width: 100%;
  height: 100%;
}
.video {
  height: 100%;
  width: 100%;
}
</style>
