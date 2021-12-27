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
              <el-checkbox v-for="item in goodsTypes" :key="item.id" :label="item.id">{{
                item.typeName
              }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <el-form-item label="全景视频">
            <FileUpload style="width: 50%;" ref="videoElement" type="video" @success="fileUploadSuccess"></FileUpload>
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
          <el-form-item label="分享海报">
            <FileUpload
             style="width: 180px;height:180px;"
              ref="posterElement"
              type="image"
              @success="posterUploadSuccess"
            ></FileUpload>
          </el-form-item>
          <DragPoster
            ref="dragPosterElement"
            v-if="formData.goodsPoster"
            @result="dragPosterChange"
            :poster="formData.goodsPoster"
            :defaultData="JSONParse(formData.posterSeat)"
          ></DragPoster>
        </div>
      </div>
      <el-form-item>
        <el-button type="primary" @click="saveBtn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, nextTick } from "vue";
import FileUpload from "@/components/FileUpload/index.vue";
import "@wangeditor/editor/dist/css/style.css";
import { IDomEditor } from "@wangeditor/editor";
import { goodsConstant } from "@/util/constant";
import { goodsTypeList } from "@/api/goodsModule/type";
import { useRoute } from "vue-router";
import { goodsDetail, goodsAdd, goodsUpdate } from "@/api/goodsModule/goods";
import { setObjValuesFromOtherObj, JSONParse } from "@/util/utils";
import { useRouter } from "vue-router";
import { editorConfig, initEditor } from "@/util/editor";
import DragPoster from "@/components/DragPoster/index.vue";

const router = useRouter();

// 获取商品id 判断详情还是修改
const { query } = useRoute();

// 获取商品类别
const goodsTypes = ref();
goodsTypeList().then(({ data }) => {
  goodsTypes.value = data;
});

// 枚举常量
const { takeGoodsMode, isFreeShipping, goodsState } = goodsConstant.value;

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
  goodsFile: "", // 视频
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
  posterSeat: "",
  goodsCover: ""
});

const formatterFormData = (form: Obj) => {
  const goodsDbDto = {
    circulation: 0,
    colour: "",
    createTime: "",
    goodsBriefIntroduction: "",
    goodsDetails: "",
    goodsDetailsJson: "",
    goodsFile: "",
    goodsName: "",
    goodsPrice: 0,
    goodsSold: 0,
    goodsSpecifications: "",
    goodsStock: 0,
    id: 0,
    isDelete: 0,
    state: 0,
    updateTime: "",
    goodsCover: ""
  };
  setObjValuesFromOtherObj(goodsDbDto, form);

  const goodsInfoDbDto = {
    goodsId: 0,
    goodsPoster: "",
    goodsVolume: "",
    goodsWeight: 0,
    id: 0,
    isFreeShipping: 0,
    posterSeat: "",
  };

  setObjValuesFromOtherObj(goodsInfoDbDto, form);

  return {
    goodsDbDto,
    goodsInfoDbDto,
    takeGoodsMode: form.takeGoodsMode,
    typeId: form.typeId,
  };
};

// 提交
const saveBtn = () => {
  if (query.id) {
    goodsUpdate(formatterFormData(formData.value));
  } else {
    formData.value.goodsVolume = JSON.stringify({
      wide: volume.value.wide,
      high: volume.value.high,
      len: volume.value.high,
      volume: volume.value.volume,
    });
    goodsAdd(formData.value).then(() => {
      router.back();
    });
  }
};

// 设置海报二维码位置
const dragPosterChange = (val: any) => {
  formData.value.posterSeat = JSON.stringify(val);
};

// 视频上传成功回调
const fileUploadSuccess = ({ data }: MyResponse) => {
  formData.value.goodsFile = JSON.stringify(data[0]);
  formData.value.goodsCover = data[0].images
};

// 海报上传成功回调
const posterUploadSuccess = ({ data }: MyResponse) => {
  formData.value.goodsPoster = data[0].url //JSON.stringify(data[0]);
};

// 富文本编辑器改变
editorConfig.onChange = (editor: IDomEditor) => {
  // 元素节点
  formData.value.goodsDetailsJson = JSON.stringify(editor.children);
  // 当编辑器选区、内容变化时，即触发
  formData.value.goodsDetails = JSON.stringify({
    json: editor.children,
    html: editor.getHtml(),
  });
};

// 获取拖拽元素
const dragPosterElement = ref();
//获取全景视频元素
const videoElement = ref();
//获取海报元素
const posterElement = ref();

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
      formData.value.typeId = data.typeDbDTOs.map((item: Obj) => item.id);
      // 储存富文本数据 获取商品详情富文本JSON
      initEditor(
        "#editor-container",
        "#toolbar-container",
        JSONParse(data.goodsDetails)?.json
      );
      nextTick(() => {
        dragPosterElement.value.setData(JSONParse(data.posterSeat));
        videoElement.value.setData(data.goodsFile);
        posterElement.value.setData(data.goodsPoster);
      });
    });
  } else {
    initEditor("#editor-container", "#toolbar-container", []);
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
