<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="等级管理" name="level">
      <div class="item-box">
        <div class="item-box-left">
          <div class="title">
            等级规则<el-button type="text" class="add-btn" @click="levelAdd"
              >新增</el-button
            >
          </div>
          <div class="level-item" v-for="(item, i) in levelListData" :key="item">
            <span class="level-item-ipt">{{ item.userLevel }}</span
            >级，所需经验<el-input
              v-model="item.needExperience"
              type="number"
              placeholder="请输入"
              class="level-item-input"
              @change="(val:string) => levelChange(val,item)"
            />
            图标
            <FileUpload
              class="image"
              :defaultUrl="item.icon"
              @success="(response) => levelUploadSuccess(response, item)"
            ></FileUpload>
            <el-button
              v-if="i == levelListData.length - 1"
              type="text"
              class="add-btn"
              @click="levelDelete(item.id)"
              >删除</el-button
            >
          </div>
        </div>
        <div class="item-box-right">
          <div class="title">
            经验规则
            <el-popover
              placement="top-start"
              title="规则名"
              :width="170"
              trigger="click"
              content="this is content, this is content, this is content"
            >
              <template #reference>
                <el-button type="text" class="add-btn">新增</el-button>
              </template>
              <el-input
                placeholder="请输入"
                v-model="levelRuleName"
                style="width: 100px; margin-right: 10px"
              />
              <el-button type="primary" size="mini" @click="levelRuleAddOne"
                >确定</el-button
              >
            </el-popover>
          </div>

          <div
            class="level-item"
            style="margin-top: 20px"
            v-for="item in levelRuleList"
            :key="item.id"
          >
            {{ item.key
            }}<el-input
              v-model="item.value"
              type="number"
              placeholder="请输入"
              @change="levelRuleUpdate(item)"
              class="level-item-input"
            />经验 ，每天上限<el-input
              v-model="item.upperLimit"
              type="number"
              placeholder="请输入"
              @change="levelRuleUpdate(item)"
              class="level-item-input"
            />经验
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="头衔管理" name="title">
      <div class="item-box">
        <div class="item-box-left">
          <div class="title">
            头衔规则<el-button type="text" class="add-btn" @click="titleAdd"
              >新增</el-button
            >
          </div>
          <div class="level-item" v-for="(item, i) in titleList" :key="item">
            <span class="level-item-ipt">{{ item.userTitle }}</span
            >级，所需积分<el-input
              v-model="item.needIntegral"
              type="number"
              placeholder="请输入"
              class="level-item-input"
              @change="(val:string) => titleChange(val,item)"
            />
            <span style="margin-left: 20px">头像框</span>
            <FileUpload
              class="image"
              :defaultUrl="item.avatarFrame"
              @success="(response) => titleUploadSuccess(response, item)"
            ></FileUpload>
            <el-button
              v-if="i == titleList.length - 1"
              type="text"
              class="add-btn"
              @click="titleDelete(item.id)"
              >删除</el-button
            >
          </div>
        </div>
        <div class="item-box-right">
          <div class="title">
            积分规则
            <!-- <el-button type="text" class="add-btn" @click="levelAdd"
              >新增</el-button
            > -->
          </div>
          <div
            class="level-item"
            style="margin-top: 20px"
            v-for="item in titleRuleList"
            :key="item.id"
          >
            消费<el-input
              v-model="item.consumption"
              type="number"
              @change="titleRuleUpdate(item)"
              placeholder="请输入"
              class="level-item-input"
            />元，获得<el-input
              v-model="item.integral"
              type="number"
              @change="titleRuleUpdate(item)"
              placeholder="请输入"
              class="level-item-input"
            />积分
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import FileUpload from "@/components/FileUpload/index.vue";
import * as levelApi from "@/api/userModule/level";

const activeName = ref("level");

const levelListData = ref<Obj>([]);

// 等级相关
const getList = () => {
  levelApi.levelList().then(({ data }) => {
    levelListData.value = data;
  });
};
getList();
const levelAdd = () => {
  levelApi
    .levelAdd({
      userLevel:
        (levelListData.value[levelListData.value.length - 1]?.userLevel ?? -1) + 1,
    })
    .then(() => {
      getList();
    });
};
const levelUploadSuccess = (response: MyResponse, item: Obj) => {
  const icon = response.data[0].url; // JSON.stringify(response.data[0]);
  levelApi.levelUpdate({
    ...item,
    icon,
  });
};
const levelChange = (needExperience: string, item: Obj) => {
  levelApi.levelUpdate({
    ...item,
    needExperience,
  });
};
const levelDelete = (id: number) => {
  levelApi.levelDelete(id).then(() => {
    getList();
  });
};

// 经验规则相关
const levelRuleList = ref<Obj>([]);
const getlevelRuleList = () => {
  levelApi.levelRuleList().then(({ data }) => {
    levelRuleList.value = data;
  });
};
getlevelRuleList();
const levelRuleName = ref("");
const levelRuleAddOne = () => {
  levelApi.levelRuleAdd({ key: levelRuleName.value }).then(() => {
    getlevelRuleList();
  });
};
const levelRuleUpdate = (item: any) => {
  levelApi.levelRuleUpdate(item);
};

// 头衔相关
const titleList = ref<Obj>([]);
const getTitleList = () => {
  levelApi.titleList().then(({ data }) => {
    titleList.value = data;
  });
};
getTitleList();
const titleChange = (needIntegral: string, item: Obj) => {
  levelApi.titleUpdate({
    ...item,
    needIntegral,
  });
};
const titleUploadSuccess = ({ data }: MyResponse, item: any) => {
  const avatarFrame = data[0].url; //JSON.stringify(data[0]);
  levelApi.titleUpdate({ ...item, avatarFrame });
};
const titleAdd = () => {
  levelApi
    .titleAdd({
      userTitle: (titleList.value[titleList.value.length - 1]?.userTitle ?? -1) + 1,
    })
    .then(() => {
      getTitleList();
    });
};
// 删除头衔
const titleDelete = (id: number) => {
  levelApi.titleDelete(id).then(() => {
    getTitleList();
  });
};
// 积分规则相关
const titleRuleList = ref<Obj>([]);
const getTitleRuleList = () => {
  levelApi.titleRuleList().then(({ data }) => {
    titleRuleList.value = data;
  });
};
getTitleRuleList();
const titleRuleUpdate = (item: any) => {
  levelApi.titleRuleUpdate(item);
};
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.item-box {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .title {
    font-size: 13px;
    font-weight: bold;
  }
  .add-btn {
    width: 50px;
  }
  .level-item {
    padding: 5px 0px;
    font-size: 14px;
    display: flex;
    align-items: flex-end;

    &-ipt {
      display: inline-block;
      text-align: center;
      width: 30px;
      color: $FONTHUI;
    }
    &-input {
      width: 100px;
    }

    &-input:focus {
      border: 0px;
    }
    .image {
      width: 50px;
      height: 50px;
      display: inline-block;
      margin-left: 5px;
    }
  }

  &-left {
    width: 48%;
    min-width: 400px;
  }
  &-right {
    width: 48%;
    min-width: 400px;
  }
}
</style>
