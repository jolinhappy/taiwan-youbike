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
          <img src="../../assets/min-main-logo.png" alt="">
        </div>
      </router-link>
      <div class="main-title">
        <p>{{$route.params.routeName}}</p>
      </div>
    </template>
    <template #body>      
      <Map :bikeLaneGeomery="bikeLaneGeomery" :laneCenter="laneCenter" :starAndEnd="starAndEnd" :zoom="laneDistance"/>
    </template>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { ArrowLeftBold } from '@element-plus/icons';
import cyclingShapeHandler from '@/api-handler/cycling';
import Map from '@/components/find-bike-lane/Map.vue';
import { useRouter, useRoute } from 'vue-router';
import { ILatLngLiteral } from '@/types/common';

export default defineComponent({
  name: 'FindBikeLaneMap',
  components: {
    BaseLayout,
    ArrowLeftBold,
    Map,
},
  setup() {
    const router = useRouter();
    const route = useRoute();
    const bikeLaneGeomery = ref<ILatLngLiteral[]>([]);
    const laneCenter = ref<ILatLngLiteral | null>(null);
    const starAndEnd = ref<ILatLngLiteral[]>([]);
    const laneDistance = ref<number>(15);

    const goBack = () => {
      router.back();
    }
    const getBikeLaneGeomery = async(city: string, routeName: string) => {
      try {
        const res = await cyclingShapeHandler.getFilteredCyclingShape(city, routeName);
        if (res) {
          bikeLaneGeomery.value = await res.data[0].Geometry.split('((')[1].split('))')[0].split(',')
          .map(item => item.split(' ')).map((item) => ({
            lat: Number(item[1]),
            lng: Number(item[0])
          }));
          laneCenter.value = bikeLaneGeomery.value[Math.ceil(bikeLaneGeomery.value.length / 2)];
          starAndEnd.value.push(bikeLaneGeomery.value[0]);
          starAndEnd.value.push(bikeLaneGeomery.value[bikeLaneGeomery.value.length - 1]);
        }
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(() => {
      const { city, routeName, distance } = route.params;
      const distanceKm = Number(distance) / 1000;
      if (distanceKm > 3) {
        laneDistance.value = 13;
      }
      getBikeLaneGeomery(city as string, routeName as string);
    });
    return {
      bikeLaneGeomery,
      laneCenter,
      starAndEnd,
      laneDistance,
      goBack,
    }
  }
})
</script>

<style lang="scss">
.find-bike-lane {
  .info-card-container {
    padding-top: 24px;
    display: flex;
    flex-wrap: wrap;
  }

  #map {
  height: calc(100vh - 64px);
  }  
}

.baseLayout header .main-title {
  color: #000000;
  margin: 0 auto;
}

.home-logo {
  display: none;
}
@media screen and (min-width: 1280px) {
  .main-title {
    padding-right: 255px;
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
</style>