<template>
  <div class="goodsEdit">
    <el-form :model="formData" label-position="top">
      <div class="demo-form-inline">
        <div class="goodsEdit-item">
          <el-form-item label="商品名称">
            <el-input
              v-model="formData.goodsName"
              placeholder="请输入"
              show-word-limit
              maxlength="24"
            ></el-input>
          </el-form-item>

          <div class="inline-item">
            <el-form-item label="价格（￥）" style="width: 40%">
              <el-input v-model="formData.goodsPrice" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="库存" style="width: 40%">
              <el-input v-model="formData.goodsStock" placeholder="请输入"></el-input>
            </el-form-item>
          </div>

          <el-form-item label="商品类型">
            <el-checkbox-group v-model="formData.typeId">
              <el-checkbox
                v-for="item in goodsTypes"
                :key="item.id"
                :label="item.id"
                >{{ item.typeName }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="全景视频">
            <FileUpload type="video"></FileUpload>
          </el-form-item>

          <el-form-item label="商品基本信息">
            <div class="inline-item">
              <el-form-item label="发行量">
                <el-input v-model="formData.circulation" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="成色">
                <el-input v-model="formData.colour" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item label="规格">
                <el-input
                  v-model="formData.goodsSpecifications"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input
              v-model="formData.goodsBriefIntroduction"
              :autosize="{ minRows: 2 }"
              type="textarea"
              show-word-limit
              maxlength="200"
              placeholder="请输入"
            />
          </el-form-item>

          <el-form-item label="商品详情" class="editor">
            <div id="toolbar-container"></div>
            <div id="editor-container"></div>
          </el-form-item>
        </div>
        <div class="goodsEdit-item">
          <el-form-item label="配送支持">
            <el-checkbox-group v-model="formData.takeGoodsMode">
              <el-checkbox
                v-for="item in Object.keys(takeGoodsMode)"
                :key="item"
                :label="item"
                >{{ takeGoodsMode[item] }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="是否包邮">
            <el-radio-group v-model="formData.isFreeShipping">
              <el-radio
                v-for="item in Object.keys(isFreeShipping)"
                :key="item"
                :label="Number(item)"
                >{{ isFreeShipping[item] }}</el-radio
              >
            </el-radio-group>
          </el-form-item>

          <el-form-item label="货物（体积，重量）">
            <div class="inline-item">
              <el-form-item label="长" style="width: 12%">
                <el-input
                  v-model="volume.len"
                  placeholder="请输入"
                ></el-input> </el-form-item
              >cm ×
              <el-form-item label="宽" style="width: 12%">
                <el-input
                  v-model="volume.wide"
                  placeholder="请输入"
                ></el-input> </el-form-item
              >cm ×
              <el-form-item label="高" style="width: 12%">
                <el-input
                  v-model="volume.high"
                  placeholder="请输入"
                ></el-input> </el-form-item
              >cm =
              <el-form-item label="体积" style="width: 12%">
                <el-input
                  v-model="volume.volume"
                  placeholder="请输入"
                ></el-input> </el-form-item
              >cm³，
              <el-form-item label="重量" style="width: 12%">
                <el-input
                  v-model="formData.goodsWeight"
                  placeholder="请输入"
                ></el-input> </el-form-item
              >kg
            </div>
          </el-form-item>

          <el-form-item label="分享海报">
            <FileUpload
              type="image"
              :defaultUrl="formData.goodsPoster"
              @success="posterUploadSuccess"
            ></FileUpload>
          </el-form-item>

          <el-form-item label="状态">
            <el-radio-group v-model="formData.state">
              <el-radio
                v-for="item in Object.keys(goodsState)"
                :key="item"
                :label="Number(item)"
                >{{ goodsState[item] }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="saveBtn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import FileUpload from "@/components/FileUpload/index.vue";
import "@wangeditor/editor/dist/css/style.css";
import {
  createEditor,
  createToolbar,
  IEditorConfig,
  IDomEditor,
} from "@wangeditor/editor";
import { goodsConstant } from "@/util/constant";
import { goodsTypeList } from "@/api/goodsModule/type"
import { useRoute } from "vue-router";
import { goodsDetail, goodsAdd, goodsUpdate } from "@/api/goodsModule/goods";
import { setObjValuesFromOtherObj,JSONParse } from "@/util/utils"
import { useRouter } from "vue-router"

const router = useRouter()

// 获取商品id 判断详情还是修改
const { query } = useRoute();

// 获取商品类别
const goodsTypes = ref();
goodsTypeList().then(({ data }) => {
  goodsTypes.value = data;
});

// 枚举常量
const { takeGoodsMode, isFreeShipping, goodsState } = goodsConstant;

// 储存体积长宽高
const volume = ref({
  len: 0,
  wide: 0,
  high: 0,
  volume: 0,
});

// 默认表单
const formData = ref({
  goodsName: "",
  goodsPrice: 0,
  goodsStock: 0,
  goodsFile:
    "https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4", // 视频
  circulation: 0,
  colour: "",
  takeGoodsMode: [],
  isFreeShipping: 0,
  goodsBriefIntroduction: "",
  goodsDetails: "",
  goodsDetailsJson: "",
  goodsVolume: "",
  goodsSpecifications: "",
  goodsWeight: 0,
  goodsPoster: "",
  state: 0,
  typeId: [],
});

const formatterFormData = (form: Obj) => {
  const goodsDbDto = {
    "circulation": 0,
    "colour": "",
    "createTime": "",
    "goodsBriefIntroduction": "",
    "goodsDetails": "",
    "goodsDetailsJson": "",
    "goodsFile": "",
    "goodsName": "",
    "goodsPrice": 0,
    "goodsSold": 0,
    "goodsSpecifications": "",
    "goodsStock": 0,
    "id": 0,
    "isDelete": 0,
    "state": 0,
    "updateTime": ""
  }
  setObjValuesFromOtherObj(goodsDbDto,form)

  const goodsInfoDbDto = {
    "goodsId": 0,
    "goodsPoster": "",
    "goodsVolume": "",
    "goodsWeight": 0,
    "id": 0,
    "isFreeShipping": 0,
    "posterSeat": ""
  }

  setObjValuesFromOtherObj(goodsInfoDbDto,form)
  
  return {
    goodsDbDto,
    goodsInfoDbDto,
    takeGoodsMode: form.takeGoodsMode,
    typeId: form.typeId
  }
}

// 提交
const saveBtn = () => {
  if (query.id) {
    goodsUpdate(formatterFormData(formData.value))
  } else {
    formData.value.goodsVolume = JSON.stringify({
      wide: volume.value.wide,
      high: volume.value.high,
      len: volume.value.high,
      volume: volume.value.volume,
    });
    goodsAdd(formData.value).then(() => {
      router.back()
    });
  }
};

// 海报上传成功回调
const posterUploadSuccess = ({ data }: MyResponse) => {
  formData.value.goodsPoster = data[0].url;
};

// 获取文件上传地址
const { state } = useStore();
const actionUrl = state.settings.baseUrl + `/other/fdfs`;
// 富文本配置
const editorConfig: Partial<IEditorConfig> = {
  placeholder: "请输入内容",
  MENU_CONF: {
    uploadImage: {
      server: actionUrl,
      fieldName: "files",
      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 20 * 1024 * 1024, // 20M
      // 自定义插入图片
      customInsert(response: any, insertFn: InsertFnType) {
        // res 即服务端的返回结果
        // 从 res 中找到 url alt href ，然后插图图片
        if (response.code == 200 && response.data.length > 0) {
          insertFn(
            `${state.settings.imgUrl}/${response.data[0].url}`,
            response.data[0].old,
            ""
          );
        } else {
          ElMessage({
            message: "图片上传出错了",
            type: "error",
          });
        }
      },
    },
  },
};
editorConfig.onChange = (editor: IDomEditor) => {
  // 元素节点
  formData.value.goodsDetailsJson = JSON.stringify(editor.children);
  // 当编辑器选区、内容变化时，即触发
  formData.value.goodsDetails = editor.getHtml();
};

// 初始化富文本
const initEditor = (goodsDetailsJson: any) => {
  // 创建编辑器
  const editor = createEditor({
    selector: "#editor-container",
    config: editorConfig,
    content: goodsDetailsJson, // 默认内容，下文有解释
    mode: "default", // 或者 'simple'
  });

  // 创建工具栏
  createToolbar({
    editor,
    selector: "#toolbar-container",
    mode: "default", // 或者 'simple'
  });
};

onMounted(() => {
  if (query.id) {
    // 查询详情 根据id
    goodsDetail(Number(query.id)).then(({ data }) => {
      formData.value = { ...formData.value, ...data };
      if (data.goodsVolume) {
        const goodsVolume = JSONParse(data.goodsVolume);
        volume.value.len = goodsVolume.len;
        volume.value.wide = goodsVolume.wide;
        volume.value.high = goodsVolume.high;
        volume.value.volume = goodsVolume.volume;
      }
      formData.value.typeId = data.typeDbDTOs.map((item: Obj) =>item.id);
      // 储存富文本数据 获取商品详情富文本JSON 
      let goodsDetailsJson: any[] = [];
      if (data.goodsDetailsJson) {
        goodsDetailsJson = JSONParse(data.goodsDetailsJson);
      }
      initEditor(goodsDetailsJson);
    });
  } else {
    initEditor([]);
  }
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";
.goodsEdit {
  .demo-form-inline {
    display: flex;
    justify-content: space-between;
    width: 100%;
    :deep(.w-e-scroll) {
      min-height: 300px;
    }
    :deep(.el-form-item) {
      width: 100%;
    }
    .inline-item {
      width: 100%;
      :deep(.el-form-item) {
        width: 30%;
        display: inline-block;
        margin-right: 10px;
        min-width: 50px;
      }
      :deep(.el-form-item__content) {
        width: 100%;
        min-width: 50px;
      }
    }
  }

  &-item {
    width: 45%;
  }
}
</style>
