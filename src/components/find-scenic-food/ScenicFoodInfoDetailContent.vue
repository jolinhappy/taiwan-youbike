<template>
  <div class="info-detail">
    <template v-if="info">
      <section class="main-picture">
        <img :src="`${info.picture}`" alt="景點美食圖">
      </section>
      <section class="info">
        <div class="info-item">
          <img src="../../assets/time.png" alt="">
          <div class="content">{{info.openTime}}</div>
        </div>
        <div class="info-item">
          <img src="../../assets/phone.png" alt="">
          <div class="content">{{info.phone}}</div>
        </div>
        <div class="info-item">
          <img src="../../assets/location.png" alt="">
          <div class="content">{{info.address}}</div>
          <button>
            <span>地圖</span>
          </button>
        </div>
      </section>
      <section class="detail-content">
        {{info.description}} 
      </section>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ScenicFoodInfoDetailContent',
  setup() {
    const info = ref<any>(null);
    const route = useRoute();
    onMounted(() => {
      const detail = route.params;
      if (detail) {
        info.value = detail;
      }
    });
    return {
      info
    }
  },
})
</script>


<style lang="scss">
.info-detail {
  width: 90%;
  display: flex;
  flex-direction: column;
  .main-picture {
    height: 217px;
    padding: 18.5px 22px;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);
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
    margin: 12px 0;
    padding: 0 15px;
    .info-item {
      display: flex;
      align-items: center;
      &:nth-child(2) {
        margin: 12.5px 0px;
      }
      img {
        width: 24px;
        height: 24px;
      }
      .content {
        font-size: 13px;
        line-height: 19px;
    
      }
      button {
        margin-left: 8px;
        border-radius: 50px;
        border: none;
        width: 48px;
        height: 25px;
        background-color: #FED801;
        cursor: pointer;
        span {
          font-family: 'Noto Sans TC';
          font-size: 13px;
        }
        &:hover {
          background-color: #fdf7d9;
        }
      }
    }
  }
  .detail-content {
    padding: 0 15px;
    color: #7a7a7a;
    text-align: left;
    line-height: 25px;
    padding-bottom: 60px;
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

// @media screen and (min-width: 1280px) {
//   .scenic-food-info-card {
//     padding: 12px 14.5px;
//     width: 362px;
//     height: 143px;
//     .picture {
//       width: 119px;
//       height: 119px;
//     }
//   }
// }

</style>