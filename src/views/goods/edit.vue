<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-position="top">
    <el-form-item label="商品名称" style="width: 40%; min-width: 400px" prop="goodsName">
      <el-input v-model="form.goodsName" placeholder="请输入商品名称"></el-input>
    </el-form-item>

    <el-form-item label="商品规格" prop="goodsSpeList">
      <el-button type="text" @click="addSpe">新增</el-button>

      <div v-for="(item, index) in form.goodsSpeList" :key="index" class="speItem">
        第 {{index + 1}} 个
        <el-form-item label="规格图片">
          <FileUpload
            @success="({ data }) => speImgUpSuccess(item, data)"
            :defaultUrl="item.goodsSpeImg"
            style="width: 100px; height: 100px"
          ></FileUpload>
        </el-form-item>
        <el-form-item label="规格名">
          <el-input v-model="item.goodsSpeName" placeholder="请输入规格名"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input-number v-model="item.goodsPrice" :min="0" />
        </el-form-item>
        <el-form-item label="库存">
          <el-input-number v-model="item.goodsStock" :min="0" :step="1" step-strictly />
        </el-form-item>

        <el-button type="text" @click="deleteSpe(index)">删除</el-button>
      </div>
    </el-form-item>

    <el-form-item label="商品详情" style="width: 50%; min-width: 500px">
      <div id="editor-container"></div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" round size="large" style="width: 400px" @click="onSubmit"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { initEditor, replaceData, replaceDataBack } from "@/util/wangEditor-v4";
import { useRoute, useRouter } from "vue-router";
import { goodsDetail, goodsAdd, goodsUpdate } from "@/api/goods";
import FileUpload from "@/components/FileUpload/index.vue";

const { query } = useRoute();

const { back } = useRouter()

const form = ref<any>({
  goodsName: null,
  content: null,
  goodsSpeList: [],
});

const rules = {
  goodsName: [
    {
      required: true,
      message: "请输入商品名称",
      trigger: "blur",
    },
  ],
  goodsSpeList: [
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value && value.length > 0) {
          const errIndex = value
            .map((item: any) => {
              return (
                Object.values(item).includes(null) || Object.values(item).includes("")
              );
            }).indexOf(true)

          if(errIndex == -1){
            callback();
          }else {
            callback(`请完善第 ${errIndex+1} 个商品规格！`);
          }
        } else {
          return callback(new Error("请完善商品规格！"));
        }
      },
      trigger: "blur",
    },
  ],
};

// 图片上传成功
const speImgUpSuccess = (item: any, [data]: any) => {
  item.goodsSpeImg = data.url;
};

// 保存
const formRef = ref();

const onSubmit = () => {
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      if (query.id) {
        goodsUpdate(form.value).then(() => {
          back();
        });
      } else {
        goodsAdd(form.value).then(() => {
          back();
        });
      }
    }
  });
};

// 新增规格
const addSpe = () => {
  form.value.goodsSpeList.push({
    goodsPrice: null,
    goodsSpeImg: null,
    goodsSpeName: null,
    goodsStock: null,
  });
};

// 移除规格
const deleteSpe = (index: number) => {
  form.value.goodsSpeList = form.value.goodsSpeList.filter((item: any, i: number) => {
    return i !== index;
  });
};

// 初始化富文本编辑器
let editor: any = null;
onMounted(() => {
  // 创建富文本编辑器
  editor = initEditor("#editor-container", (html: string) => {
    form.value.content = replaceData(html);
  });

  if (query.id) {
    goodsDetail(Number(query.id)).then(({ data }) => {
      form.value = data;
      editor.txt.html(replaceDataBack(data.content ?? ""));
    });
  }
});
</script>

<style lang="scss" scoped>
.speItem {
  border: 1px solid $BORDERHUI;
  padding: 20px;
  width: 40%;
  min-width: 400px;
}
</style>
