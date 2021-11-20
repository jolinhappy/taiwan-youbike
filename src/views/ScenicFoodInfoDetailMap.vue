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
        <div class="main-title">
          <p>{{$route.params.name}}</p>
        </div>
      </template>
      <template #body>
        <ScenicFoodInfoMap/>
      </template>
    </BaseLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { ArrowLeftBold } from '@element-plus/icons';
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
    const nearByTourismInfo = ref<IScenicSpotTourismInfo[]>([]);
    const router = useRouter();
    const getDetail = () => {
      router.push({name: 'ScenicFoodInfoDetail'});

    };

    const goBack = () => {
      router.back();
    };

    return {
      getDetail,
      goBack,
    }
  },
})
</script>

<style lang="scss">

.scenic-food-info-container {
  width: 90%;
  margin: auto;
  padding-top: 24px;
  gap: 10px;
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  .cards {
    display: flex;
    align-items: center;
    // width: 90%;
    gap: 10px;
    justify-content: center;
    flex-wrap: wrap;
  }
}
.find-scenic-food {
  .baseLayout body {
    max-height: calc(100vh - 60px);
    overflow: auto;
    display: flex;
    justify-content: center;
    padding-top: 20px;
  }
  .home-logo {
    display: none;
  }
}


@media screen and (min-width: 1280px) {

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