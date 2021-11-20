<template>
  <div class="scenic-food-info-card">
    <div class="picture">
      <img :src="tourisnInfo.Picture?.PictureUrl1" alt="景點美食照">
    </div>
    <div class="info">
      <!-- <div class="distance">1.1km</div> -->
      <div class="name">{{ tourisnInfo.Name }}</div>
      <div class="phone">
        <img src="../../assets/phone.png" alt="地標圖">
        {{ tourisnInfo.Phone }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IRestaurantTourismInfo } from '@/types/tourism';

export default defineComponent({
  name: 'ScenicFoodInfoCard',
  props: {
    tourisnInfo: {
      type: Object as PropType<IRestaurantTourismInfo>,
      default: () => ({})
    }
  },
  setup() {
    return {}
    
  },
})
</script>


<style lang="scss">
.scenic-food-info-card {
  width: 310px;
  height: 93px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  padding: 9px 10.5px;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #fdf7d9;
  }
  .picture {
    width: 75px;
    height: 75px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    flex: 1;
    .distance {
      margin-left: auto;
      color: #FED801;
      margin-bottom: 6px;
    }
    .name {
      color: #000000;
      font-size: 16px;
      line-height: 24px;
      text-align: left;
      margin-bottom: auto;
      // white-space: nowrap;
      // overflow: hidden;
      // text-overflow: ellipsis;
    }
    .phone {
      margin-right: auto;
      line-height: 15px;
      font-size: 13px;
      color: #6A7A7A;
      display: flex;
      img {
        width: 15px;
        height: 15px;
        margin-right: 9px;
      }

    }
  }
}

@media screen and (min-width: 768px) {
  .scenic-food-info-card {
    padding: 12px 14.5px;
    width: 362px;
    height: 143px;
    .picture {
      width: 119px;
      height: 119px;
    }
  }
}

</style>