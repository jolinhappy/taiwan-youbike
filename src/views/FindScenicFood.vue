<template>
  <div class="find-scenic-food">
    <BaseLayout>
      <template #header>
        <div class="back-button">
          <el-icon @click="goBack">
            <ArrowLeftBold/>
          </el-icon>
        </div>
        <router-link to="/">
          <div class="home-logo">
            <img src="../assets/min-main-logo.png" alt="">
          </div>
        </router-link>
      </template>
      <template #body>
        <div class="scenic-food-info-container">
          <div class="cards">
            <template v-for="info in nearByTourismInfo" :key="info.ID">
              <ScenicFoodInfoCard :tourisnInfo="info" @click="getDetail(info)"/>
            </template>
          </div>
        </div>
        <div class="gps-search" @click="getLocation">
          <img src="../assets/GPS.png" alt="">
          <p>附近</p>
        </div>
      </template>
      <template #footer>
        <div class="footer">
          <div class="footer-button" :class="{active: searchType === 'Spot'}" @click="searchType='Spot'">
            <img :src="require(`../assets/${searchType === 'Spot' ? 'active' : 'inactive'}-attraction.png`)" alt="">
            景點
          </div>
          <div class="footer-button" :class="{active: searchType === 'Food'}"  @click="searchType='Food'">
            <img :src="require(`../assets/${searchType === 'Food' ? 'active' : 'inactive'}-food.png`)" alt="">
            美食
          </div>
        </div>
      </template>
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { ArrowLeftBold } from '@element-plus/icons';
import { ILatLngLiteral } from '@/types/common';
import tourismHandler from '@/api-handler/tourism';
import { IScenicSpotTourismInfo } from '@/types/tourism';
import { useRouter } from 'vue-router';

type SearchType = 'Spot' | 'Food';
export default defineComponent({
  name: 'FindScenicFood',
  components: {
    BaseLayout,
    ArrowLeftBold,
  },
  setup() {
    const isShowBikeLand = ref<boolean>(false);
    const currentPosition = ref<ILatLngLiteral | null>(null);
    const searchType = ref<SearchType>('Spot');
    const nearByTourismInfo = ref<IScenicSpotTourismInfo[]>([]);
    const router = useRouter();
    const getLocation = async() => {
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition(showPosition);
      }
    };
    const showPosition = (position: any) => {
      const { latitude, longitude } = position.coords;
      currentPosition.value = {
        lat: latitude,
        lng: longitude,
      };
    };

    const getNearByScenics = async(currentPosition: ILatLngLiteral) => {
      const {lat, lng} = currentPosition;
      const res = await tourismHandler.getNearbyScenicSpots(lat, lng);
      nearByTourismInfo.value = res.data;
    };
    const getNearbyRestaurants = async(currentPosition: ILatLngLiteral) => {
      const {lat, lng} = currentPosition;
      const res = await tourismHandler.getNearbyRestaurants(lat, lng);
      nearByTourismInfo.value = res.data;
    }
    const searchTourism = () => {
      if (!currentPosition.value) return;
      if (searchType.value === 'Spot') {
        getNearByScenics(currentPosition.value);
      }
      if (searchType.value === 'Food') {
        getNearbyRestaurants(currentPosition.value)
      }
    };

    const getDetail = (v: any) => {
      const { Picture, Phone, Position, OpenTime, Address, Name, Description} = v;
      const detail = {
        picture: Picture.PictureUrl1 ? Picture.PictureUrl1 : '../assets/no-image-found.png',
        phone: Phone,
        positionLat: Position.PositionLat,
        positionLng: Position.PositionLon,
        openTime: OpenTime,
        address: Address,
        name: Name,
        description: Description
      }
      router.push({name: 'ScenicFoodInfoDetail', params: detail});
    };
    const goBack = () => {
      router.back();
    };

    watch(() => currentPosition.value, () => {
      searchTourism();
    });
    watch(() => searchType.value, () => {
      searchTourism();
    });
    onMounted(async() => {
      await getLocation();
      if (currentPosition.value) {
        getNearByScenics(currentPosition.value);
      }
    });

    return {
      searchType,
      nearByTourismInfo,
      getLocation,
      getDetail,
      goBack,
    }
  },
})
</script>

<style lang="scss">
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

.scenic-food-info-container {
  width: 90%;
  margin: auto;
  padding-top: 24px;
  gap: 10px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  .cards {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
}
.find-scenic-food {
  .baseLayout body {
    max-height: calc(100vh - 120px);
    overflow: auto;
  }
  .home-logo {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .scenic-food-info-container {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .scenic-food-info-container {
    .cards {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  .find-scenic-food {
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
  }

}
</style>