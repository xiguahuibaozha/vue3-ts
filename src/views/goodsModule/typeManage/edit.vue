<template>
  <div class="typeEdit">
    <el-form :model="formData" label-position="top">
      <el-form-item label="类型图标">
        <!--  :defaultUrl="" -->
        <FileUpload
          type="image"
          @success="fileUploadSuccess"
          :default-url="formData.typeIcon"
        ></FileUpload>
      </el-form-item>
      <el-form-item label="类型名">
        <el-input v-model="formData.typeName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="saveBtn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FileUpload from "@/components/FileUpload/index.vue";
import { goodsTypeAdd, goodsTypeDetail, goodsTypeUpdate } from "@/api/goodsModule/type";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const formData = ref({
  typeIcon: "",
  typeName: "",
});

const route = useRoute();
if (route.query.id) {
  goodsTypeDetail(Number(route.query.id)).then(({ data }) => {
    formData.value = { ...formData.value, ...data };
  });
}

const fileUploadSuccess = (response: MyResponse) => {
  formData.value.typeIcon = response.data[0].url;
};

const saveBtn = () => {
  // 拥有id则为修改
  if (route.query.id) {
    goodsTypeUpdate(formData.value)
  } else {
    goodsTypeAdd(formData.value).then(() => {
      router.back();
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";
.typeEdit {
  :deep(.el-input__inner) {
    width: 50%;
  }
}
</style>
