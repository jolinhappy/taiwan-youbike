<template>
  <div class="find-bike">
    <BaseLayout>
      <template #header>
        <div class="back-button">
          <router-link to="/">
            <el-icon>
              <ArrowLeftBold/>
            </el-icon>
          </router-link> 
        </div>
        <router-link to="/">
          <div class="home-logo">
            <img src="../assets/min-main-logo.png" alt="">
          </div>
        </router-link>
        <div class="toggle-button">
          <el-button-group>
            <el-button :class="{active: searchType === 'Rent'}" @click="searchType='Rent'">
              <img :src="require(`../assets/head-${searchType === 'Rent' ? 'active' : 'inactive'}-rent.png`)">
              租車
            </el-button>
            <el-button :class="{active: searchType === 'Return'}" @click="searchType='Return'">
              <img :src="require(`../assets/head-${searchType === 'Return' ? 'active' : 'inactive'}-return.png`)" alt="">
              還車
            </el-button>
          </el-button-group>
        </div>
      </template>
      <template #body>
        <div class="search-input">
          <CustomSelect width="123px" height="44px" :options="taiwanLocationList" @input="getSelectedOption" default="選擇縣市"/>
          <el-input placeholder="尋找站點" v-model="searchInput"/>
          <el-button type="primary" @click="onSearch">
            <img src="../assets/search.png" alt="搜尋">
          </el-button>
        </div>
        <div class="gps-search" @click="getLocation">
          <img src="../assets/GPS.png" alt="">
          <p>附近</p>
        </div>
        <FindBikeMap :currentPosition="currentPosition" :searchType="searchType"/>
      </template>
      <template #footer>
        <div class="footer">
          <div class="footer-button" :class="{active: searchType === 'Rent'}" @click="searchType='Rent'">
            <img :src="require(`../assets/${searchType === 'Rent' ? 'active' : 'inactive'}-rent.png`)" alt="">
            租車
          </div>
          <div class="footer-button" :class="{active: searchType === 'Return'}" @click="searchType='Return'">
            <img :src="require(`../assets/${searchType === 'Return' ? 'active' : 'inactive'}-return.png`)" alt="">
            還車
          </div>
        </div>
      </template>
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { ArrowLeftBold } from '@element-plus/icons';
import FindBikeMap from '@/components/find-bike/FindBikeMap.vue';
import { ILatLngLiteral } from '@/types/common';
import { IPointType } from '@/types/bike';
import { taiwanLocation } from '@/utils/location';
import bikeHandler from '@/api-handler/bike';
import CustomSelect from '@/components/common/CustomSelect.vue';
import useMessage from '@/hooks/use-message'

type SearchType = 'Rent' | 'Return';
export default defineComponent({
  name: 'FindBike',
  components: {
    BaseLayout,
    ArrowLeftBold,
    FindBikeMap,
    CustomSelect
},
  setup() {
    const taiwanLocationList = taiwanLocation;
    const selectedLocation = ref<string>('');
    const currentPosition = ref<ILatLngLiteral | null>(null);
    const searchType = ref<SearchType>('Rent');
    const searchInput = ref<string>('');
    const { $message } = useMessage(); 

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    };
    const showPosition = (position: any) => {
      const { latitude, longitude } = position.coords;
      currentPosition.value = {
        lat: latitude,
        lng: longitude,
      };
    };

    const getSelectedOption = (option: any) => {
      selectedLocation.value = option.value;
    };

    const onSearch = async() => {
      try {
        if (selectedLocation.value === '') {
          $message.warning('請選擇地區！');
          return;
        }
        if (searchInput.value.trim() === '') {
          $message.warning('請填入站點名稱！');
          return;
        }
        const res = await bikeHandler.getOneStationInfo(selectedLocation.value, searchInput.value);
        if (res) {
          if (res.data.length === 0) {
            $message.warning('查無相關資料！');
          } else {
            const { PositionLat, PositionLon } = res.data[0].StationPosition as IPointType;
            currentPosition.value = {
              lat: PositionLat as number,
              lng: PositionLon as number
            }
          }
        }
      } catch (error) {
        $message.error(`${error}`);
      }

    };

    onMounted(() => {
      getLocation();
    });

    return {
      taiwanLocationList,
      currentPosition,
      searchType,
      searchInput,
      getLocation,
      getSelectedOption,
      onSearch,
    }
  },
})
</script>

<style lang="scss">
.home-logo {
  display: none;
}
.search-input {
  position: absolute;
  display: flex;
  z-index: 99;
  left: 50%;
  transform: translate(-50%);
  top: 86px;
  .custom-select .selected {
    border-radius: 8px;
  }
  .custom-select .selected.open {
    border-radius: 8px 8px 0px 0px;
  }
  .custom-select .item {
    border-radius: 0px 0px 8px 8px;
  }

  .el-button {
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #000000;
    --el-button-border-color: #000000;
    --el-button-hover-color: #000000;
    img {
      width: 24px;
    }
  }
  .el-input {
    width: 150px;
    border: 0px;
    margin-right: 8px;
    margin-left: 8px;
    .el-input__inner {
      height: 44px;
      line-height: 44px;
      border-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
    }
    &:hover {
      .el-input__inner {
        background-color: #ffffff;
      }
    }
  }
}
.gps-search {
  width: 62px;
  height: 62px;
  background: #000000;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 99;
  justify-content: center;
  align-items: center;
  right: 16px;
  bottom: 80px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
  }
  p {
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    font-family: 'Roboto';
    margin-top: 5.6px;
  }
}

.footer {
  height: 56px;
  background: #FED801;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 17px;
  font-weight: 400;
  .footer-button {
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #fff;
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }
    &.active {
      color: #000000;
    }
  }
}

.toggle-button {
  display: none;
}

@media screen and (min-width: 768px) {
  .search-input {
    .el-input {
      width: 240px;
    }
  }  
}
@media screen and (min-width: 1280px) {
  .gps-search {
    bottom: 30px;
  }
  .find-bike {
    footer {
      .footer {
        display: none;
      }
    }
  }
  .search-input {
    top: 114px;
    .el-input {
      width: 255px;
    }
  }
  .back-button {
    display: none;
  }
  .home-logo {
    display: block;
    img {
      width: 255px;
      height: 43px;
      object-fit: cover;
    }
  }
  .toggle-button {
    display: block;
    width: 100%;
    padding-right: 255px;
    .el-button {
      width: 162px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 30px;
      border: 0px;
      &.active {
        background: #000;
        span {
          color: #FED801;
        }
      }
      span {
        display: inline-flex;
        align-items: center;
        color: #000;
        font-family: 'Noto Sans TC';
        font-weight: 400;
        font-size: 14px;
        line-height: 21px;
      }
      img {
        width: 32px;
        height: 32px;
        margin-right: 11px;
      }
    }
  }
}
</style>