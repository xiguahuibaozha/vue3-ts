<template>
  <el-form :inline="true" :model="formFilter" size="mini">
    <el-form-item label="商品名">
      <el-input v-model="formFilter.goodsName" placeholder="商品名"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>

  <el-button type="primary" @click="push('/goodsEdit')" size="mini">新增</el-button>

  <el-table :data="tableData" style="margin-top: 20px">
    <el-table-column type="expand">
      <template #default="props">
        <div style="margin-bottom: 10px">商品规格</div>
        <el-table :data="props.row.goodsSpeList" border>
          <el-table-column label="规格图片">
            <template #default="props2">
              <el-image
                style="width: 80px; height: 50px"
                fit="cover"
                :preview-src-list="props.row.goodsSpeList.map((item:any) => state.settings.imgUrl + '/' + item.goodsSpeImg)"
                :src="state.settings.imgUrl + '/' + props2.row.goodsSpeImg"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon><PictureFilled /></el-icon>
                  </div>
                </template>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="goodsSpeName" label="规格名称" />
          <el-table-column prop="goodsNumber" label="数量" />
          <el-table-column prop="goodsPrice" label="价格（￥）" />
          <el-table-column prop="goodsStock" label="库存" />
          <el-table-column prop="createTime" label="创建时间" />
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="商品名称" prop="goodsName" />
    <el-table-column label="访问地址">
      <template #default="props">
        {{`${h5Url}/${props.row.id}`}}
      </template>
    </el-table-column>
    <el-table-column label="访问二维码">
      <template #default="props">

        <el-popover
          trigger="click"
          placement="bottom"
          title="二维码地址"
          :width="180"
        >
          <img :src="qrcodeUrl" style="width:180px;height:180px;" />

          <template #reference>
            <el-icon @click="getQrcodeUrl(`${h5Url}/${props.row.id}`)" :size="20" style="cursor: pointer;"><element-qrcode></element-qrcode></el-icon>
          </template>
        </el-popover>
        
      </template>
    </el-table-column>
    <el-table-column label="创建时间" prop="createTime" />
    <el-table-column fixed="right" label="操作" width="200">
      <template #default="props">
        <el-button type="primary" size="mini" @click="push(`/goodsEdit?id=${props.row.id}`)">编辑</el-button>
        <el-popconfirm title="Are you sure to delete this?" @confirm="deleteBtn(props.row.id)">
          <template #reference>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
    v-model:currentPage="formFilter.currentPage"
    :page-sizes="[1, 10, 20, 50]"
    :page-size="formFilter.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    style="margin-top: 20px"
  >
  </el-pagination>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { page, deleteGoods } from "@/api/goods";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import QRCode from 'qrcode'

const { push } = useRouter()

const { state } = useStore()

const h5Url = state.settings.h5Url

// 查询表单
const defauleForm: PageParams = {
  pageSize: 10,
  currentPage: 1,
  goodsName: null
};
const formFilter = ref({ ...defauleForm });

const submit = () => {
  getPage();
};

const reset = () => {
  formFilter.value = { ...defauleForm };
  getPage();
};

// 表格
const tableData = ref<any[]>([]);

// 总条数
const total = ref(0);

const getPage = () => {
  page(formFilter.value).then(({ data }: any) => {
    tableData.value = data.data;
    total.value = data.total;
  });
};

getPage();

// 分页
const handleSizeChange = (size: number) => {
  formFilter.value.pageSize = size;
  formFilter.value.currentPage = 1;
  getPage();
};

const handleCurrentChange = () => {
  getPage();
};

// 删除
const deleteBtn = (id:number) => {
  deleteGoods(id)
}

// 二维码
const qrcodeUrl = ref<string>()
const getQrcodeUrl = (url:string) => {
  QRCode.toDataURL(url)
  .then((url:string) => {
    qrcodeUrl.value =  url
  })
}

</script>

<style lang="scss" scoped></style>
