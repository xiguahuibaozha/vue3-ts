<template>
  <div class="detail">
    <div class="dynamic-detail">
      <div class="title">动态详情</div>
      <div class="dynamic-detail-content">
        <div class="dynamic-detail-content-top">
          <HeadImage class="head-image" :avatarFrame="''" :headImage="''"></HeadImage>
          <div class="dynamic-detail-content-top-right">
            <div class="name">张三</div>
            <span class="btn" style="background-color: #24272f">
              <element-dianzan></element-dianzan>
              <span class="btn-txt">120</span>
            </span>
            <span class="btn" style="background-color: #ff8888">
              <element-pinglun></element-pinglun>
              <span class="btn-txt">32</span>
            </span>
            <span class="time">2012/1/12 12:12:12</span>
            <div class="other">
              <element-jvbao class="icon"></element-jvbao>
              <span>200</span>
            </div>
            <div class="operation">
              <el-popconfirm title="确定要删除这个动态吗？">
                <template #reference>
                  <span>删除</span>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </div>
        <div class="dynamic-detail-content-center">
          <ImageEl style="width: 100px; height: 100px" :src="''"></ImageEl>
          <div class="message">
            火龙果 （仙人掌科量天尺属植物） 火龙果（学名：Hylocereus undatus
            'Foo-Lon'）是仙人掌科、量天尺属量天尺的栽培品种，攀援肉质灌木，具气根。分枝多数，延伸，叶片棱常翅状，边缘波状或圆齿状，深绿色至淡蓝绿色，骨质；花漏斗状，于夜间开放；鳞片卵状披针形至披针形，萼状花被片黄绿色，线形至线状披针形，瓣状花被片白色，长圆状倒披针形，花丝黄白色，花柱黄白色，浆果红色，长球形，果脐小，果肉白色、红色。种子倒卵形，黑色，种脐小。7-12月开花结果。
            分布中美洲至南美洲北部，世界各地广泛栽培，藉气根攀援于树干、岩石或墙上，海拔3-300米。
            该种分枝扦插容易成活，常作嫁接蟹爪属，仙人棒属和多种仙人球的砧木，花可作蔬菜，浆果可食，商品名“火龙果”。
          </div>
        </div>
        <div class="dynamic-detail-content-bottom">
          <ImageEl v-for="i in 9" :key="i" class="bottom-image" :src="''"></ImageEl>
        </div>
      </div>
    </div>
    <div class="dynamic-comment">
      <div class="title">动态评论</div>
      <div class="dynamic-comment-content">
        <div class="dynamic-comment-content-title">
          <span
            :class="{
              active: commentWhich == 0,
            }"
            @click="commentWhich = 0"
            >全部评论</span
          >
          <span
            :class="{
              active: commentWhich == 1,
            }"
            @click="commentWhich = 1"
            >被投诉</span
          >
        </div>
        <div class="dynamic-comment-content-body">
          <div
            class="dynamic-comment-content-body-item"
            v-for="item in commentList"
            :key="item.id"
          >
            <HeadImage
              class="head-image"
              :avatarFrame="item.avatarFrame"
              :headImage="item.head"
            ></HeadImage>
            <div class="item-content">
              <div class="content-top">
                <div class="name name-level">
                  {{ item.nickName }}
                  <ImageEl style="width: 15px; height: 15px;margin-left:5px;" :src="item.userLevelImage"></ImageEl>
                </div>
                <span class="btn" style="background-color: #24272f">
                  <element-dianzan></element-dianzan>
                  <span class="btn-txt">{{ item.commentNums || 0 }}</span>
                </span>
                <span class="btn" style="background-color: #ff8888">
                  <element-pinglun></element-pinglun>
                  <span class="btn-txt">{{ item.complaintNums || 0 }}</span>
                </span>
                <span class="time">{{ item.createTime }}</span>
                <div class="operation">
                  <el-popconfirm title="确定要删除这个动态吗？" @confirm="commentDel(item)">
                    <template #reference>
                      <span>删除</span>
                    </template>
                  </el-popconfirm>
                </div>
              </div>
              <div class="content-body">
                <div class="reply" v-if="item.repliedNickName">
                  回复 {{ item.repliedNickName }}：
                </div>
                {{ item.commentContent }}
              </div>
            </div>
          </div>
          <el-pagination
            v-model:currentPage="commentFilter.currentPage"
            :page-size="commentFilter.pageSize"
            layout="total, prev, pager, next"
            :total="commentTotal"
            @current-change="commentHandleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeadImage from "@/components/HeadImage/index.vue";
import ImageEl from "@/components/ImageEl/index.vue";
import { ref, watch } from "vue";
import { commentPage, commentDelete } from "@/api/dynamicModule/comment";
import { useRoute } from "vue-router";
// import { dynamicDetail } from "@/api/dynamicModule/dynamic"
// dynamicDetail(String(route.query.id)).then(({data}) => {
//     console.log(data)
// })

const route = useRoute();

const commentWhich = ref(0);

// 评论相关
const commentFilter = ref<PageParams>({
  currentPage: 1,
  pageSize: 5,
  dynamicId: route.query.id,
  keyWord: ""
});
const commentList = ref<Obj>([]);
const commentTotal = ref(0);
const getCommentList = () => {
  commentPage(commentFilter.value).then(({ data }) => {
    commentList.value = data.data;
    commentTotal.value = data.total;
  });
};
getCommentList();
const commentHandleCurrentChange = () => {
  getCommentList();
}
watch(commentWhich, (val:number) => {
  commentFilter.value.currentPage = 1
  if(val == 0){
    commentFilter.value.keyWord = ""
  }else if(val == 1){
    commentFilter.value.keyWord = "complaintNums"
  }
  getCommentList();
});
const commentDel = (item:any) => {
  commentDelete(item.id).then(() => {
    getCommentList();
  })
}
</script>

<style lang="scss" scoped>
.detail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .title {
    font-size: 13px;
    font-weight: bold;
    height: 30px;
  }
  .btn {
    color: #ffffff;
    border-radius: 5px;
    height: 20px;
    padding: 0px 5px;
    display: flex;
    align-items: center;

    &-txt {
      margin-left: 2px;
    }
  }
  .name {
    font-weight: bold;
    color: $FONTHEI;
  }

  .name-level{
    display: flex;
    align-items: center;
  }
  .operation {
    display: inline-block;
    color: $FONTHUI;
    span {
      margin: 0px 3px;
      cursor: pointer;
    }
  }

  .time {
    font-size: 12px;
    color: $FONTHUI;
  }
  .dynamic-detail {
    width: 48%;
    min-width: 300px;
    &-content {
      background-color: white;
      padding: 10px;
      &-top {
        display: flex;
        border-bottom: 1px solid $BORDERHUI;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .head-image {
          width: 50px;
          height: 50px;
          border: 1px solid $BORDERHUI;
          border-radius: 3px;
        }

        &-right {
          box-sizing: border-box;
          width: calc(100% - 50px);
          padding: 0px 10px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          color: $FONTHUI;
          .other {
            display: flex;
            align-items: center;
            .icon {
              color: #ff8888;
              margin-right: 2px;
              font-size: 12px;
            }
          }
        }
      }

      &-center {
        display: flex;
        border-bottom: 1px solid $BORDERHUI;
        padding-bottom: 10px;
        margin-bottom: 10px;
        .message {
          width: calc(100% - 100px);
          box-sizing: border-box;
          padding-left: 10px;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: 1px;
        }
      }

      &-bottom {
        display: flex;
        flex-wrap: wrap;
        .bottom-image {
          width: 100px;
          height: 100px;
          margin-right: 10px;
          margin-bottom: 10px;
        }
      }
    }
  }
  .dynamic-comment {
    width: 48%;
    min-width: 300px;

    &-content {
      background-color: white;
      padding: 10px;

      &-title {
        font-size: 12px;
        border-bottom: 1px solid $BORDERHUI;
        padding-bottom: 15px;
        margin-bottom: 10px;

        span {
          margin-right: 20px;
          font-weight: bold;
          padding-bottom: 3px;
          cursor: pointer;
        }
        .active {
          border-bottom: 3px solid $GULAN;
        }
      }
      &-body {
        &-item {
          font-size: 0px;
          display: flex;
          border-bottom: 1px solid $BORDERHUI;
          padding-bottom: 10px;
          margin-bottom: 10px;
          .head-image {
            width: 50px;
            height: 50px;
            border: 1px solid $BORDERHUI;
            border-radius: 3px;
          }
          .item-content {
            width: calc(100% - 50px);
            padding: 0px 10px;
            box-sizing: border-box;
            font-size: 12px;
            .content-top {
              display: flex;
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px dashed $BORDERHUI;
              padding-bottom: 6px;
            }
            .content-body {
              margin-top: 6px;
              letter-spacing: 1px;
              line-height: 18px;
              .reply {
                color: $FONTHUI;
                margin-bottom: 2px;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
