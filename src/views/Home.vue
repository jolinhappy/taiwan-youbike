<template>
  <div class="home">
    <div class="home-container">
      <header class="home-images">
        <img class="bike-logo" src="../assets/home-page-logo.png" alt="腳踏車圖">
        <img class="text-image" src="../assets/home-page-text.png" alt="where's your bike">
        <h2 class="title">微&nbsp;&nbsp;&nbsp;&nbsp;笑&nbsp;&nbsp;&nbsp;&nbsp;單&nbsp;&nbsp;&nbsp;&nbsp;車．暢&nbsp;&nbsp;&nbsp;&nbsp;遊&nbsp;&nbsp;&nbsp;&nbsp;城&nbsp;&nbsp;&nbsp;&nbsp;市</h2>
      </header>
      <body class="button-group">
        <el-button @click="redirecTo('FindBike')">尋找 Youbike</el-button>
        <el-button @click="redirecTo('FindBikeLane')">查詢自行車道</el-button>
        <el-button @click="redirecTo('FindScenicFood')">附近景點、美食</el-button>
      </body>
      <footer>
        <p>Where’s YouBike  © Code: 文科少女  /  Design: KT</p>
      </footer>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Home',
  setup() {
    const router = useRouter();
    const redirecTo = (componentName: string) => {
      console.log('ddd')
      router.push({name: componentName});
    };
    return {
      redirecTo
    }
  },
})
</script>

<style lang="scss">
.home {
  box-sizing: border-box;
  background-color: #FED801;
  height: 100vh;
  align-items: center;
  justify-content: center;
  display: flex;

  .home-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    h2 {
      font-size: 15px;
      color: #000000;
      margin-top: 7px;
    }
    .home-images {
      width: 248px;
      display: flex;
      flex-direction: column;
      text-align: left;
      margin-bottom: 106px;
      .bike-logo {
        width: 119px;
      }
      .text-image {
        width: 245px;
      }
    }
    .button-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 40px;
      .el-button {
        width: 248px;
        height: 48px;
        border-radius: 10px;
        border: 2px solid #000000;
        --el-button-background-color: var(--el-color-primary);
        color: #000000;
        font-weight: bold;
        &:hover {
          background: #000;
          border: 2px solid #000;
          color: #ffffff;
        }
        &+.el-button {
          margin-left: 0;
          margin-top: 10px;
        }
      }
    }
    footer {
      height: 30px;
      flex: 0;
      padding-bottom: 20px;
      p {
        font-size: 12px;
        color: #000000;
      }
    }
  }
}
</style>

