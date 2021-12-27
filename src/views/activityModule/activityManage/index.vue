<template>
  <page-default>
    <template #form>
      <el-form ref="form" :model="filterForm" inline>
        <el-form-item label="活动名称">
          <el-input v-model="filterForm.keyWord" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="searchTime"
            type="datetimerange"
            value-format="YYYY-MM-DD HH:mm:ss"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="searchTimeChange"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="状态" clearable>
            <el-option
              v-for="item in Object.keys(activityConstant.state)"
              :key="item"
              :label="activityConstant.state[item]"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="runToEdit">新增</el-button>
      <el-button type="text" @click="recommendSet">推荐设置</el-button>
    </template>

    <template #table>
      <div class="table">
        <table-item
          v-for="item in tableData"
          :key="item.id"
          :item="item"
          @handle="tableHandle"
        ></table-item>
      </div>
    </template>

    <template #pagination>
      <el-pagination
        v-model:currentPage="filterForm.currentPage"
        :page-size="filterForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[1, 5, 10, 20]"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
  </page-default>

  <!-- 人数注水 -->
  <el-dialog v-model="joinNumsDialogVisible" title="活动注水" width="350px">
    <el-form :model="joinNumsForm" class="my-form" label-position="top">
      <el-form-item label="参与人数注水">
        <el-input
          v-model="joinNumsForm.falseJoinNums"
          type="number"
          min="0"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="浏览人数注水">
        <el-input
          v-model="joinNumsForm.falseBrowseNums"
          placeholder="请输入"
          type="number"
          min="0"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="joinNumsDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveJoinNums">保存</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 报名名单 -->
  <el-dialog v-model="personListDialogVisible" title="报名名单" width="500px">
    <el-table :data="signupList">
      <el-table-column label="头像">
        <template #default="scope">
           <ImageEl style="width:40px;height:40px;" :src="scope.row.head" :previewList="signupList.map((item:any) => {
             return item.head
           })" :initialIndex="scope.$index"></ImageEl>
        </template>
      </el-table-column>
      <el-table-column prop="nickName" label="昵称" />
      <el-table-column prop="phone" label="电话" width="100px"/>
      <el-table-column prop="createTime" label="报名时间"  width="150px"/>
    </el-table>
    <el-pagination
      v-model:currentPage="signupForm.currentPage"
      :page-size="signupForm.pageSize"
      layout="total, prev, pager, next"
      :total="signupTotal"
      @current-change="signupHandleCurrentChange"
    >
    </el-pagination>
  </el-dialog>

  <!-- 推荐 -->
  <el-dialog v-model="recommendDialogVisible" title="推荐设置" width="550px">
    <div class="recommend-title">特别推荐</div>
    <div
      class="recommend-item-none"
      @click="addRecommendClick('isSpecial')"
      v-if="recommendList.isSpecial.length == 0"
    ></div>
    <div v-else>
      <div class="recommend-item" v-for="item in recommendList.isSpecial" :key="item.id">
        <div class="recommend-item-box">
          <ImageEl class="image" :src="item.imagesUrl"></ImageEl>
          <div class="recommend-item-box-right">
            <div class="recommend-item-box-right-title">
              {{ item.activityName }}
            </div>
            <div>{{ activityConstant.state[item.state] }}</div>
            <div class="recommend-item-box-right-time">
              {{ item.activityStartTime }} - {{ item.activityEndTime }}
            </div>
          </div>
        </div>
        <div class="recommend-item-del" @click="removeSpecialRecommend(item)">删除</div>
      </div>
    </div>
    <div class="recommend-title">热门推荐</div>

    <div
      class="recommend-item"
      v-for="item in recommendList.isHot"
      :key="item.id"
      style="margin-bottom: 10px"
    >
      <div class="recommend-item-box">
        <ImageEl class="image" :src="item.imagesUrl"></ImageEl>
        <div class="recommend-item-box-right">
          <div class="recommend-item-box-right-title">
            {{ item.activityName }}
          </div>
          <div>{{ activityConstant.state[item.state] }}</div>
          <div class="recommend-item-box-right-time">
            {{ item.activityStartTime }} - {{ item.activityEndTime }}
          </div>
        </div>
      </div>
      <div class="recommend-item-del" @click="removeHotRecommend(item)">删除</div>
    </div>

    <div
      class="recommend-item-none"
      @click="addRecommendClick('isHot')"
      v-if="recommendList.isHot.length < 3"
    ></div>

    <!-- 推荐搜索 -->
    <el-dialog
      v-model="recommendSearchDialogVisible"
      width="300px"
      title="请选择活动"
      append-to-body
    >
      <el-select
        v-model="recommendSearchItem"
        filterable
        remote
        value-key="id"
        placeholder="请输入关键字"
        :remote-method="recommendSearchRemoteMethod"
        @change="recommendSearchChange"
      >
        <el-option
          v-for="item in recommendSearchList"
          :key="item.id"
          :label="item.activityName"
          :value="item"
        >
          <span style="font-size: 12px"
            >{{ item.activityName }}（{{ item.createTime }}）</span
          >
        </el-option>
      </el-select>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  activityPage,
  activityUpdate,
  activityDelete,
  activityList,
} from "@/api/activityModule/activity";
import { signupPage } from "@/api/activityModule/signup";
import PageDefault from "@/components/PageDefault/index.vue";
import { ref } from "vue";
import TableItem from "./item.vue";
import { activityConstant } from "@/util/constant";
import { useRouter } from "vue-router";
import ImageEl from "@/components/ImageEl/index.vue";

const defaultForm = {
  pageSize: 5,
  currentPage: 1,
  keyWord: null,
  startTime: "",
  endTime: "",
  status: null,
};

const filterForm = ref({ ...defaultForm });
// 查询事件
const searchTime = ref([]);
//searchTimeChange 时间修改
const searchTimeChange = (times: string[]) => {
  if (times && times.length > 0) {
    filterForm.value.startTime = times[0];
    filterForm.value.endTime = times[1];
  }
};

const total = ref(0);

const tableData = ref<Obj[]>([]);

const getList = () => {
  activityPage(filterForm.value).then(({ data }) => {
    tableData.value = data.data;
    total.value = data.total;
  });
};

getList();

const onSubmit = () => {
  filterForm.value.pageSize = defaultForm.pageSize;
  filterForm.value.currentPage = 1;
  getList();
};

const reset = () => {
  searchTime.value = [];
  filterForm.value = { ...defaultForm };
  getList();
};

const handleSizeChange = (size: number) => {
  filterForm.value.pageSize = size;
  filterForm.value.currentPage = 1;
  getList();
};

const handleCurrentChange = () => {
  getList();
};

// 跳转修改
const router = useRouter();
const runToEdit = () => {
  router.push("/activityEdit");
};

// 注水
const itemForm = ref({});
const joinNumsDialogVisible = ref(false);
const joinNumsForm = ref({
  falseJoinNums: 0,
  falseBrowseNums: 0,
});
const saveJoinNums = () => {
  joinNumsDialogVisible.value = false;
  activityUpdate({ ...itemForm.value, ...joinNumsForm.value }).then(() => {
    getList();
  });
};

// 人员名单
const personListDialogVisible = ref(false);
const signupForm = ref<PageParams>({
  pageSize: 10,
  currentPage: 1,
  id: null,
});
const signupTotal = ref(0);
const signupList = ref<Obj>([]);
const getSignupList = () => {
  signupPage(signupForm.value).then(({ data }) => {
    signupList.value = data.data;
    signupTotal.value = data.total;
  });
};
const signupHandleCurrentChange = () => {
  getSignupList();
};

// 推荐设置
const recommendList = ref<{ [name: string]: Obj[] }>({
  isSpecial: [],
  isHot: [],
});
const recommendDialogVisible = ref(false);
const recommendSet = () => {
  recommendDialogVisible.value = true;
  // 获取特别推荐列表
  activityList({ isSpecial: 1 }).then(({ data }) => {
    recommendList.value.isSpecial = data;
  });
  // 获取热门推荐列表
  activityList({ isHot: 1 }).then(({ data }) => {
    recommendList.value.isHot = data;
  });
};
const recommendSearchDialogVisible = ref(false);
const recommendSearchList = ref();
const recommendSearchItem = ref();

// 远程搜索选择活动
const recommendSearchRemoteMethod = (keyWord: string) => {
  activityList({ activityName: keyWord }).then(({ data }) => {
    recommendSearchList.value = data;
  });
};

let recommendWhich = "isSpecial";
// 特别推荐add点击
const addRecommendClick = (name: string) => {
  recommendWhich = name;
  recommendSearchDialogVisible.value = true;
};

// 搜索结束关闭 搜索dialog
const recommendSearchChange = () => {
  recommendSearchDialogVisible.value = false;
  if (!recommendSearchItem.value) {
    return;
  }
  activityUpdate({ id: recommendSearchItem.value.id, [recommendWhich]: 1 }).then(() => {
    recommendSearchItem.value = null;
    activityList({ [recommendWhich]: 1 }).then(({ data }) => {
      recommendList.value[recommendWhich] = data;
    });
  });
};

// 移除特别推荐
const removeSpecialRecommend = (item: any) => {
  activityUpdate({ id: item.id, isSpecial: 0 }).then(() => {
    activityList({ isSpecial: 1 }).then(({ data }) => {
      recommendList.value["isSpecial"] = data;
    });
  });
};

// 移除热门推荐
const removeHotRecommend = (item: any) => {
  activityUpdate({ id: item.id, isHot: 0 }).then(() => {
    activityList({ isHot: 1 }).then(({ data }) => {
      recommendList.value["isHot"] = data;
    });
  });
};

// 表格item btn点击事件
const tableHandle = (name: string, item: any) => {
  itemForm.value = item;
  if (name == "joinNums") {
    joinNumsForm.value.falseJoinNums = item.falseJoinNums;
    joinNumsForm.value.falseBrowseNums = item.falseBrowseNums;
    joinNumsDialogVisible.value = true;
  } else if (name == "over") {
    activityUpdate({ ...itemForm.value, state: 0 }).then(() => {
      getList();
    });
  } else if (name == "delete") {
    activityDelete(item.id).then(() => {
      getList();
    });
  } else if (name == "edit") {
    router.push({
      path: "/activityEdit",
      query: {
        id: item.id,
      },
    });
  } else if (name == "personList") {
    personListDialogVisible.value = true;
    signupForm.value.id = item.id;
    getSignupList();
  }
};
</script>

<style lang="scss" scoped>
.table {
  display: flex;
  flex-wrap: wrap;
}

.my-form {
  @import "@/styles/element.scss";
  :deep(.el-input__inner) {
    background-color: white;
  }
}
.recommend-title {
  margin: 10px 0px;
}
.recommend-item {
  display: inline-block;
  border: 1px solid $BORDERHUI;
  border-radius: 5px;
  padding: 5px;
  position: relative;

  &-del {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
    padding: 3px 5px;
    background-color: $DISEHUI;
    border-radius: 2px;
    cursor: pointer;
  }
  .image {
    height: 80px;
    width: 80px;
  }
  &-box {
    display: flex;
    font-size: 12px;
    &-right {
      margin-left: 5px;
      padding: 5px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      &-title {
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}
.recommend-item-none {
  width: 200px;
  height: 100px;
  border: 1px dashed $BORDERHEI;
  border-radius: 5px;
}
.recommend-item-none {
  width: 200px;
  height: 100px;
  border: 1px dashed $BORDERHEI;
  border-radius: 5px;
  text-align: center;
  line-height: 100px;
  cursor: pointer;
}
.recommend-item-none:hover {
  border: 1px dashed $GULAN;
  color: $GULAN;
}
.recommend-item-none::after {
  content: "+";
  font-size: 25px;
}
</style>
