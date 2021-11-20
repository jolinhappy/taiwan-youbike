<template>
  <div class="find-scenic-food-detail">
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
        <div class="main-title">
          <p>{{$route.params.name}}</p>
        </div>
      </template>
      <template #body>
        <ScenicFoodInfoDetailContent/>
      </template>
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { ArrowLeftBold } from '@element-plus/icons';
// import tourismHandler from '@/api-handler/tourism';
import { IScenicSpotTourismInfo } from '@/types/tourism';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FindBike',
  components: {
    BaseLayout,
    ArrowLeftBold,
  },
  setup() {
    const isShowBikeLand = ref<boolean>(false);
    // const currentPosition = ref<ILatLngLiteral | null>(null);
    const nearByTourismInfo = ref<IScenicSpotTourismInfo[]>([]);
    const router = useRouter();
    // const getLocation = async() => {
    // if (navigator.geolocation) {
    //   console.log('GPS')
    //     await navigator.geolocation.getCurrentPosition(showPosition);
    //   }
    // };
    // const showPosition = (position: any) => {
    //   const { latitude, longitude } = position.coords;
    //   currentPosition.value = {
    //     lat: latitude,
    //     lng: longitude,
    //   };
    //   console.log(currentPosition.value)
    //   // currentPosition.value = { lat: 25.0325917, lng: 121.5624999 };
    // };

    // const searchedStationInfo = () => {
    //   try {
    //     const res = await bikeHandler.getOneStationInfo()
    //   } catch(error) {
    //     console.log(error);
    //   }
    // }
    // const onSearch = async() => {
    //   const search
    // };
    // const getNearByScenics = async(currentPosition: ILatLngLiteral) => {
    //   const {lat, lng} = currentPosition;
    //   const res = await tourismHandler.getNearbyScenicSpots(lat, lng);
    //   nearByTourismInfo.value = res.data;
    // };
    // const getNearbyRestaurants = async(currentPosition: ILatLngLiteral) => {
    //   const {lat, lng} = currentPosition;
    //   const res = await tourismHandler.getNearbyRestaurants(lat, lng);
    //   nearByTourismInfo.value = res.data;
    // }
    // const searchTourism = () => {
    //   if (!currentPosition.value) return;
    //   if (searchType.value === 'Spot') {
    //     getNearByScenics(currentPosition.value);
    //   }
    //   if (searchType.value === 'Food') {
    //     getNearbyRestaurants(currentPosition.value)
    //   }
    // };

    const getDetail = () => {
      router.push({name: 'ScenicFoodInfoDetail'});

    };

    // watch(() => currentPosition.value, () => {
    //   searchTourism();
    // });
    // watch(() => searchType.value, () => {
    //   searchTourism();
    // });
    // onMounted(async() => {
    //   console.log('start')
    //   await getLocation();
    //   console.log('cuuu', currentPosition.value)
    //   if (currentPosition.value) {
    //     getNearByScenics(currentPosition.value);
    //   }
    // });
    // onMounted(() => {
    //   info.
    // });
    const goBack = () => {
      router.back();
    };

    return {
      isShowBikeLand,
      // currentPosition,
      nearByTourismInfo,
      // getLocation,
      getDetail,
      goBack,
    }
  },
})
</script>

<style lang="scss">

// footer {
//   display: none;
// }

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
    align-items: center;
    // width: 90%;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
.find-scenic-food-detail {
  .baseLayout {
    header {
      .main-title {
        width: 100%;
        color: #000000;
      }
    }
    body {
      max-height: calc(100vh - 60px);
      overflow: auto;
      display: flex;
      justify-content: center;
      padding-top: 20px;
    }
  }
  .home-logo {
    display: none;
  }
}

@media screen and (min-width: 1280px) {
  .find-scenic-food-detail {
    .main-title {
      margin-right: 255px;
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
  }
}
</style>