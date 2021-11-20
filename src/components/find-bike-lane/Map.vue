<template>
  <div id="map">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, PropType, computed } from 'vue';
import createHTMLMapMarker from "../../hooks/use-html-map-maker";
import { ILatLngLiteral } from '@/types/common';

export default defineComponent({
  name: 'FindLaneMap',
  props: {
    bikeLaneGeomery: {
      type: Array as PropType<ILatLngLiteral[]>,
      default: () => []
    }, 
    laneCenter: {
      type: Object as PropType<ILatLngLiteral>,
      default: () => ({ lat: 25.0325917, lng: 121.5624999 })
    },
    starAndEnd: {
      type: Array as PropType<ILatLngLiteral[]>,
      default: () => []
    },
    distance: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const map = ref<any>(null);
    const center = ref<ILatLngLiteral>({
      lat: 25.0325917,
      lng: 121.5624999
    });
    const polylinePath = ref<ILatLngLiteral[]>([]);
    const startAndEnd = ref<ILatLngLiteral[]>([]);
    const initMap = () => {
      const zoom = computed(() => props.distance > 3 ? 8 : 16);
      map.value = new window.google.maps.Map(document.getElementById("map") as Element, {
        center: center.value,
        zoom: zoom.value,
        maxZoom: 18,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        disableDefaultUI: true,
      });
      const lineSymbol = {
        path: window.google.maps.SymbolPath.CIRCLE,
        strokeOpacity: 1,
        fillOpacity: 1,
        scale: 3
      };
      const line = new window.google.maps.Polyline({
        path: polylinePath.value,
        strokeOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }],
        map: map.value
      });
    };

    const setBikeLaneMakers = () => {
      if (startAndEnd.value) {
        props.starAndEnd.map(async(lane, index) => {
          if (!lane) return;
          const { lat, lng } = lane;
          let latling = await new window.google.maps.LatLng({lat: lat, lng: lng});
          if (index === 0) {
            const markers = await createHTMLMapMarker({
              latlng: latling,
              map: map.value,
              html: `<div class="location">
                <img class="locaion-img" src="/img/return-location.png">
                <div class="count return">始</div>
                </div`
            });
          } 
          else {
            const markers = await createHTMLMapMarker({
              latlng: latling,
              map: map.value,
              html: `<div class="location">
                <img class="locaion-img" src="/img/return-location.png">
                <div class="count return">終</div>
                </div`
            });
          }
        });
      }
    };

    watch(() => props.laneCenter, async(v)=> {
      center.value = v;
      await initMap();
      
    });

    watch(() => props.bikeLaneGeomery, () => {
      setBikeLaneMakers();
    });

    watch(() => props.bikeLaneGeomery, async(v) => {
      polylinePath.value = await props.bikeLaneGeomery;
      initMap();
      setBikeLaneMakers();
    });

    watch(() => props.distance, () => {
      initMap();
      setBikeLaneMakers();      
    })

    onMounted(() => {
      initMap();
    });  
    return {
      setBikeLaneMakers,
      initMap,
    }
  },
})
</script>

<style lang="scss">
#map {
  height: calc(100vh - 120px);
}
.location {
  width: 36px;
  height: 50px;
  position: relative;
  .locaion-img {
    width: 36px;
    height: 50px;
  }
  .count {
    position: absolute;
    left: 50%;
    transform: translate(-60%);
    top: 20%;
    font-family: 'Roboto';
    font-size: 15px;
    font-weight: 900;
    font-style: italic;
    &.rent {
      color: #000000; 
    }
    &.return {
      color: #ffffff;
    }
  }
}
</style>