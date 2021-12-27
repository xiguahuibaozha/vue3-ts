<template>
  <div class="activity-edit">
    <el-form label-position="top" :model="formData">
      <div class="activity-edit-form">
        <div class="activity-edit-form-left">
          <el-form-item label="活动名称">
            <el-input
              v-model="formData.activityName"
              maxlength="18"
              show-word-limit
              placeholder="请输入"
            ></el-input>
          </el-form-item>

          <el-form-item label="封面">
            <FileUpload
              class="image"
              :defaultUrl="formData.imagesUrl"
              @success="(response) => imageUploadSuccess(response)"
            ></FileUpload>
          </el-form-item>

          <el-form-item label="活动内容">
            <div id="toolbar-container"></div>
            <div id="editor-container"></div>
          </el-form-item>
        </div>
        <div class="activity-edit-form-right">
          <el-form-item label="活动时间">
            <el-date-picker
            :disabledDate="disabledDate"
              v-model="timeChoose"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="timeChooseChange"
            >
            </el-date-picker>
          </el-form-item>

          <el-form-item label="底部交互">
            <el-radio-group v-model="formData.operation">
              <el-radio :label="1">报名</el-radio>
              <el-radio :label="2">跳转</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="报名费（不收费请输入0）" v-if="formData.operation == 1">
            ￥<el-input
              style="width: 120px"
              v-model="formData.cost"
              :min="0"
              placeholder="请输入"
              type="number"
            ></el-input>
          </el-form-item>

          <el-form-item label="跳转目标" v-if="formData.operation == 2">
            <el-input v-model="formData.jump" placeholder="请输入"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="saveForm">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import FileUpload from "@/components/FileUpload/index.vue";
import "@wangeditor/editor/dist/css/style.css";
import { IDomEditor } from "@wangeditor/editor";
import { editorConfig, initEditor } from "@/util/editor";
import { activityAdd, activityDetail, activityUpdate } from "@/api/activityModule/activity";
import { useRouter, useRoute } from "vue-router";
import { JSONParse } from "@/util/utils";

const formData = ref({
  activityName: null, // 活动名称
  imagesUrl: "", // 活动封面图
  activityStartTime: "", // 活动开始时间
  activityEndTime: "", // 活动结束时间
  operation: 1, // 类型 1报名，2连接
  cost: 0, // 报名费
  jump: "", // 跳转地址
  activityContent: "", //活动内容
});

const imageUploadSuccess = (response: MyResponse) => {
  formData.value.imagesUrl = response.data[0].url //JSON.stringify(response.data[0]);
};

// 选择活动 开始-结束 时间
const timeChoose = ref<string[]>([]);
const timeChooseChange = () => {
  if (timeChoose.value && timeChoose.value.length == 2) {
    formData.value.activityStartTime = timeChoose.value[0];
    formData.value.activityEndTime = timeChoose.value[1];
  }
};

// 时间禁用
const disabledDate = (date:Date) => {
  if(date.getTime() > new Date().getTime()){
    return false
  }
  return true
}

// 富文本编辑器改变
editorConfig.onChange = (editor: IDomEditor) => {
  // 设置活动内容
  formData.value.activityContent = JSON.stringify({
    json: editor.children,
    html: editor.getHtml(),
  });
};

const route = useRoute();

// 保存
const router = useRouter();
const saveForm = () => {
  if(route.query.id){
    activityUpdate(formData.value)
  }else {
    activityAdd(formData.value).then(() => {
      router.back();
    });
  }
};

onMounted(() => {
  if (route.query.id) {
    activityDetail(Number(route.query.id)).then(({data}) => {
      formData.value =  data
      timeChoose.value = [data.activityStartTime, data.activityEndTime]
      const content = JSONParse(data.activityContent)
      if(content.json){
        initEditor("#editor-container", "#toolbar-container", content.json);
      }else{
        initEditor("#editor-container", "#toolbar-container", []);
      }
    });
  }else {
    initEditor("#editor-container", "#toolbar-container", []);
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";
.activity-edit {
  &-form {
    display: flex;
    justify-content: space-between;
    :deep(.w-e-scroll) {
      min-height: 300px;
    }
    &-left {
      width: 48%;
      .image {
        width: 128px;
        height: 128px;
      }
    }
    &-right {
      width: 48%;
    }
  }
}
</style>
