<template>
  <div class="bike-lane-info-card">
    <div class="bike-lane-name">{{ info.RouteName}}</div>
    <div class="bike-lane-info">
      <div class="bike-lane-distance">{{ info.Direction }} {{info.CyclingLength}}</div>
      <div class="bike-lane-location">
        <img src="../assets/location.png" alt="地標圖">
        {{ info.City }} {{ info.Town }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBikeShape } from '@/types/cycling';

export default defineComponent({
  name: 'BikeLaneInfoCard',
  props: {
    info: {
      type: Object as PropType<IBikeShape>,
      default: () => ({})
    }
  },
  setup() {
    return {}
    
  },
})
</script>


<style lang="scss">
.bike-lane-info-card {
  width: 310px;
  height: 79px;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: #fdf7d9;
  }
  .bike-lane-name {
    color: #000000;
    font-size: 16px;
    line-height: 24px;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bike-lane-info {
    display: flex;
    align-items: center;
    font-size: 13px;
    line-height: 15px;
    color: #7a7a7a;
    font-weight: normal;
    justify-content: space-between;
    .bike-lane-distance {
      min-width: 90px;
      text-align: left;
    }
    .bike-lane-location {
      display: flex;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      img {
        width: 24px;
        height: 24px;
      }      
    }

  }
}

@media screen and (min-width: 768px) {
  .bike-lane-info-card {
    width: 362px;
  }
}


</style>