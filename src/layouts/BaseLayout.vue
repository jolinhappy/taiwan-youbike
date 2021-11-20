<template>
  <div class="baseLayout">
    <header>
      <slot name="header"></slot>
    </header>
    <body>
      <slot name="body"></slot>
    </body>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseLayout',
  setup() {
    return {}
  },
})
</script>

<style lang="scss">
.baseLayout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  header {
    height: 64px;
    background: #FED801;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16.5px;
  }
  body {
    flex: 1;
    max-height: calc(100vh - 64px);
    overflow: auto;
  }
}

@media screen and (min-width: 1280px) {
  .baseLayout {
    header {
      height: 92px;
    }
  }
}

</style>
