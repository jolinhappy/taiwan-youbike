<template>
  <div id="main">
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Noto Sans TC', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#main {
  width: 100%;
  min-height: 100vh;
  background: #E5E5E5;
}

::-webkit-scrollbar {
width:8px;
height:8px;
background-color:#fff;
}

::-webkit-scrollbar-thumb {
border-radius:10px;
background-color:#555;
}

</style>
