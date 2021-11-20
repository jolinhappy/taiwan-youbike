<template>
  <BaseLayout class="find-bike-lane">
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
      <CustomSelect width="143px" height="31px" :options="taiwanLocationList" @input="getSelectedOption" default="選擇縣市"/>
    </template>
    <template #body>
      <template v-if="bikeLanesInfo.length === 0">
        <div class="no-info">尚未選擇任何縣市</div>
      </template>
      <div class="info-card-container">
        <div class="cards">
          <template v-for="bikeLane in bikeLanesInfo" :key="bikeLane.StationUID">
            <BikeLaneInfoCard :info="bikeLane" @click="checkLaneMap(bikeLane)"/>
          </template>
        </div>
      </div>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { ArrowLeftBold } from '@element-plus/icons';
import { taiwanLocation } from '@/utils/location';
import cyclingShapeHandler from '@/api-handler/cycling';
import { IBikeShape } from '@/types/cycling';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FindBikeLane',
  components: {
    BaseLayout,
    ArrowLeftBold,
},
  setup() {
    const router = useRouter();
    const taiwanLocationList = taiwanLocation;
    const selectedLocation = ref<string>('');
    const bikeLanesInfo = ref<IBikeShape[]>([]);

    const searchBikeLane = async () => {
      try {
        const res = await cyclingShapeHandler.getCyclingShape(selectedLocation.value);
        bikeLanesInfo.value = res.data;
      } catch (error) {
        console.log(error);
      }
    };

    const checkLaneMap = async(bikeLaneInfo: IBikeShape) => {
      try {
        const { RouteName, CyclingLength } = bikeLaneInfo;      
        router.push({name: 'FindBikeLaneMap', params: { city: selectedLocation.value, routeName: RouteName, distance: CyclingLength }});
      } catch(error) {
        console.log(error);
      }
    };

    const getSelectedOption = (option: any) => {
      selectedLocation.value = option.value;
      searchBikeLane();
    };
    const goBack = () => {
      router.back();
    };

    return {
      taiwanLocationList,
      bikeLanesInfo,
      getSelectedOption,
      checkLaneMap,
      goBack,
    }
  },
})
</script>

<style lang="scss">
.find-bike-lane {
  .no-info {
    margin-right: auto;
    padding-top: 24px;
    padding-left: 30px;
    text-align: left;
  }
  .info-card-container {
    text-align: left;
    padding-top: 24px;
    display: flex;
    gap: 10px;
    width: 90%;
    margin: auto;
    margin-bottom: 60px;
    justify-content: center;
    .cards {
      display: grid;
      grid-template-rows: 1fr;
      grid-gap: 10px;
    }
  }
  #map {
    height: calc(100vh - 64px);
  }
  .home-logo {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .find-bike-lane {
    .cards {
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 15px;
    }
  }
}

@media screen and (min-width: 1280px) {
  .find-bike-lane {
    .cards {
      grid-template-columns: repeat(3, 1fr);
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