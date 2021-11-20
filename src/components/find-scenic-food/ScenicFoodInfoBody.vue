<template>
  <div class="scenic-food-info-body">
    <template v-for="info in nearByTourismInfo" :key="info.ID">
      <ScenicFoodInfoCard :tourisnInfo="info" />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IBikeShape } from '@/types/cycling';

export default defineComponent({
  name: 'ScenicFoodInfoBody',
  props: {
    info: {
      type: Object as PropType<IBikeShape>,
      default: () => ({})
    },
    nearByTourismInfo: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    return {}
    
  },
})
</script>


<style lang="scss">

</style>