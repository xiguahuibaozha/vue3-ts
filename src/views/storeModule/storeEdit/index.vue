<template>
  <div class="edit">
    <el-form label-position="top" :model="formData" class="demo-form-inline">
      <el-form-item label="门店名">
        <el-input
          v-model="formData.storeName"
          maxlength="14"
          show-word-limit
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input
          v-model="formData.phone"
          maxlength="11"
          show-word-limit
          placeholder="请输入"
        ></el-input>
        <!-- <el-input v-model="formData.phone" placeholder="请输入">
          <template #prepend>
            <el-select v-model="formData.phone" placeholder="请选择" style="width: 110px">
              <el-option label="Restaurant" value="1"></el-option>
              <el-option label="Order No." value="2"></el-option>
              <el-option label="Tel" value="3"></el-option>
            </el-select>
          </template>
        </el-input> -->
      </el-form-item>

      <el-form-item label="选择地址" class="map-box">
        <div class="amap" id="container"></div>
        <div class="search-ipt">
          <input id="pickerInput" v-model="searchKeyWord" placeholder="请输入地址" />
        </div>
      </el-form-item>

      <el-form-item label="详细地址">
        <el-input v-model="formData.shopAddress" placeholder="请输入">
          <template #prepend>
            {{ formData.province + formData.city + formData.area || "请先选择地址" }}
          </template>
        </el-input>
        <div style="font-size: 12px">
          {{ formData.province + formData.city + formData.area || ""
          }}{{ formData.shopAddress || "" }}
        </div>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="formData.status" :active-value="0" :inactive-value="1" active-text="启用" inactive-text="禁用"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="saveBtn">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { initAMap } from "@/util/aMap";
import { storeAdd, storeDetail, storeUpdate } from "@/api/storeModule/store";
import { useRoute } from "vue-router";

const { query } = useRoute();

const formData = ref<Params>({
  province: null, //所在省
  city: null, //所在市
  area: null, //所在区
  shopAddress: null, //详细地址
  latitude: null, //纬度
  longitude: null, //经度
  status: 0, //禁用状态(0:正常|1禁用)
  storeName: null, //店铺名称
  phone: null, //联系电话
});

const searchKeyWord = ref<string>();

const saveBtn = () => {
  if (formData.value.id) {
    storeUpdate(formData.value);
  } else {
    storeAdd(formData.value).then(({ data }) => {
      formData.value = data;
    });
  }
};

onMounted(() => {
  initAMap(["AMap.Geolocation", "AMap.Geocoder"], ["misc/PoiPicker"])
    .then((AMap) => {
      const map = new AMap.Map("container", {
        zoom: 14,
      });

      //地图逆编码
      const geocoder = new AMap.Geocoder();

      // 创建一个标点
      let marker: any = null;

      if (query.id) {
        storeDetail(Number(query.id)).then(({ data }) => {
          formData.value = data;

          // 通过id判断是否存在详情，有则定位到目标位置
          if (formData.value.id) {
            if (!marker) {
              marker = new AMap.Marker({
                map,
              });
            }
            const lnglat = {
              Q: formData.value.latitude,
              R: formData.value.longitude,
            };
            map.setCenter(lnglat);
            marker.setPosition(lnglat);
            marker.setTitle(formData.value.shopAddress);
          }
        });
      }

      const creatMarker = (position: any, title?: string) => {
        // 创建标点
        if (!marker) {
          marker = new AMap.Marker({
            map,
          });
        }
        marker.setPosition(position);
        marker.setTitle(title);
      };

      //反编译详细地址并且赋值
      const getFormData = (lnglat: any) => {
        geocoder.getAddress(lnglat, (status: string, result: any) => {
          const addressComponent = result.regeocode.addressComponent;
          formData.value = {
            ...formData.value,
            province: addressComponent.province, //所在省
            city: addressComponent.city, //所在市
            area: addressComponent.district, //所在区
            shopAddress:
              addressComponent.street +
              addressComponent.township +
              (searchKeyWord.value ?? ""), //详细地址
            latitude: String(lnglat.Q), //纬度
            longitude: String(lnglat.R), //经度
          };
          // 设置标点
          creatMarker(lnglat, formData.value.shopAddress);
        });
      };

      // 监听map点击事件
      map.on("click", (e: any) => {
        console.log(e.lnglat);
        searchKeyWord.value = "";
        // 逆编码地址
        getFormData(e.lnglat);
      });

      // 监听map点击事件
      map.on("hotspotclick", (e: any) => {
        searchKeyWord.value = e.name;
        getFormData(e.lnglat);
        // 抛出异常终止后面的事件继续执行
        throw "阻止冒泡";
      });

      // 搜索以及自动补全
      const poiPicker = new AMapUI.PoiPicker({
        input: "pickerInput",
        placeSearchOptions: {
          extensions: "all",
        },
      });

      // 获取用户位置 控件
      const geolocation = new AMap.Geolocation({
        enableHighAccuracy: false, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      // 添加控件
      map.addControl(geolocation);
      // 定位到当前用户位置
      // geolocation.getCurrentPosition();

      poiPicker.on("poiPicked", ({ item }: any) => {
        // 设置输入框值
        searchKeyWord.value = item.name;
        //设置中心点
        map.setCenter(item.location);
        // 设置标点
        creatMarker(item.location, item.name);

        getFormData(item.location);
      });
    })
    .catch((e) => {
      console.log(e);
    });
});
</script>

<style lang="scss" scoped>
@import "@/styles/element.scss";

.edit {
  :deep(.el-form-item__content) {
    width: 50%;
    min-width: 250px;
  }
  .map-box {
    width: 100%;
    position: relative;

    :deep(.el-form-item__content) {
      width: 80%;
    }

    .amap {
      border: 2px solid $BORDERHEI;
      border-radius: 10px;
      height: 500px;
    }

    .search-ipt {
      position: absolute;
      top: 20px;
      left: 20px;
      width: 200px;

      #pickerInput {
        height: 25px;
        background-color: $DISEHUI;
        border: 1px solid $ASIDEHUISE;
        border-radius: 5px;
        font-size: 12px;
      }
    }
  }
}
</style>
