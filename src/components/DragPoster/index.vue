<template>
  <div class="creat-poster-class">
    <div class="qrcode-poster">
      <img ref="posterElement" :src="getUrl(poster)" title="海报" />
      <div
        @dragstart="dragstart"
        @dragend="dragend"
        class="qrcode"
        :style="{
          width: data.qrcodeSize + 'px',
          height: data.qrcodeSize + 'px',
          left: data.qrcodeLeft + 'px',
          top: data.qrcodeTop + 'px',
        }"
      >
        <img :src="qrcodeImage" title="二维码" style="width: 100%; height: 100%" />
      </div>
    </div>
    <div class="qrcode-size">
      <span>二维码尺寸</span>
      <el-input-number
        style="width: 25%; min-width: 100px"
        type="number"
        v-model="data.qrcodeSize"
        :min="10"
        :max="180"
        controls-position="right"
      />px
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import qrcodeImage from "@/assets/images/qrcode-black.png";
import { getUrl } from "@/util/utils";

defineProps({
  poster: {
    type: String,
    default:""
  },
});

// 获取海报元素
const posterElement = ref();

// 具体参数
const data = ref({
  qrcodeSize: 100,
  qrcodeTop: 0,
  qrcodeLeft: 0,
  posterWidth: 0,
  posterHeight: 0,
});

const emit = defineEmits(["result"]);

// 储存拖拽开始的位置
const dragStartXY = {
  x: 0,
  y: 0,
};
const dragstart = (e: any) => {
  dragStartXY.x = e.clientX;
  dragStartXY.y = e.clientY;
};

const dragend = (e: any) => {
  const x = e.clientX;
  const y = e.clientY;

  const endX = x - dragStartXY.x;
  const endY = y - dragStartXY.y;

  let top = data.value.qrcodeTop + endY;
  let left = data.value.qrcodeLeft + endX;
  if (top < 0) {
    top = 0;
  } else if (top > data.value.posterHeight - data.value.qrcodeSize) {
    top = data.value.posterHeight - data.value.qrcodeSize;
  }

  if (left < 0) {
    left = 0;
  } else if (left > data.value.posterWidth - data.value.qrcodeSize) {
    left = data.value.posterWidth - data.value.qrcodeSize;
  }

  data.value.qrcodeTop = top;
  data.value.qrcodeLeft = left;

  // 返回结果给父组件
  emit("result", data.value);
};

// 是否允许重写加载二维码位置
let canChangeData = true;

// 设置data默认值请调用 setData方法
defineExpose({
  setData(val: any) {
    data.value = val;
    canChangeData = false;
  },
});

onMounted(() => {
  posterElement.value.onload = () => {
    if (canChangeData) {
      data.value.posterWidth = posterElement.value.offsetWidth;
      data.value.posterHeight = posterElement.value.clientHeight;
      data.value.qrcodeTop =
        (posterElement.value.clientHeight - data.value.qrcodeSize) / 2;
      data.value.qrcodeLeft =
        (posterElement.value.offsetWidth - data.value.qrcodeSize) / 2;
    }
    canChangeData = true
    emit("result", data.value);
  };
});
</script>

<style lang="scss" scoped>
@mixin crease {
  border: 0px;
  background-color: $DISEHUI;
}

.creat-poster-class {
  .qrcode-poster {
    border: 1px dashed #d9d9d9;
    border-radius: 5px;
    width: 300px;
    overflow: hidden;
    padding: 0px;
    position: relative;
    font-size: 0;

    img {
      width: 100%;
    }

    .qrcode {
      position: absolute;
      left: 0px;
      top: 0px;
      background-color: white;
      border-radius: 5px;
    }
  }

  .qrcode-size {
    display: flex;
    align-items: center;
    margin-top: 20px;
    span {
      font-size: 12px;
      min-width: 80px;
    }

    :deep(.el-input-number__decrease) {
      @include crease;
    }
    :deep(.el-input-number__increase) {
      @include crease;
    }
  }
}
</style>
