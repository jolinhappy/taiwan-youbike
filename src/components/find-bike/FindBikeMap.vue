<template>
  <div id="map">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import createHTMLMapMarker from "../../hooks/use-html-map-maker";
import { ILatLngLiteral, IFormatedStationInfo } from '@/types/common';
import { IBikeAvailability, IBikeStation } from '@/types/bike';
import bikeHandler from '@/api-handler/bike';

export default defineComponent({
  name: 'FindBikeMap',
  props: {
    currentPosition: {
      type: Object,
      default: () => ({})
    },
    searchType: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    const map = ref<any>(null);
    const center = ref<ILatLngLiteral>({
      lat: 25.0325917,
      lng: 121.5624999
    });
    const stationsInfo = ref<IFormatedStationInfo[] | null>(null);
    const initMap = () => {
      map.value = new window.google.maps.Map(document.getElementById("map") as Element, {
        center: center.value,
        zoom: 15,
        maxZoom: 20,
        minZoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
        disableDefaultUI: true,
      });
    };

    const getNearByBikeStationInfo = async(currentPosition: any) => {
      try {
        const { lat, lng } = currentPosition;
        const nearByAvailabilityBike = await bikeHandler.getNearByAvailabilityBike(lat, lng);
        const nearByStationInfo = await bikeHandler.getNearByStationInfo(lat, lng);
        if (nearByAvailabilityBike && nearByStationInfo) {
          formatStationInfo(nearByAvailabilityBike.data, nearByStationInfo.data);
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    const formatStationInfo = (nearByAvailabilityBike: IBikeAvailability[], nearByStationInfo: IBikeStation[]) => {
      stationsInfo.value = nearByAvailabilityBike.reduce((result: IFormatedStationInfo[], item) => {
        for (let station of nearByStationInfo) {
          if (item.StationUID === station.StationUID) {
            result.push({
              availableRentBikes: item.AvailableRentBikes as number,
              availableReturnBikes: item.AvailableReturnBikes as number,
              lat: station.StationPosition?.PositionLat as number,
              lng: station.StationPosition?.PositionLon as number,
              stationName: station.StationName?.Zh_tw as string
            });
          }
        }
        return result;
      }, []);
    };

    const setStationMakers = () => {
      const infoWindow = new window.google.maps.InfoWindow({
        pixelOffset: new window.google.maps.Size(0, -20)
      });
      if (stationsInfo.value) {
        stationsInfo.value.map((station) => {
          const { lat, lng, availableRentBikes, availableReturnBikes, stationName } = station;
          let latling = new window.google.maps.LatLng({lat: lat, lng: lng});
          const infoContentString = `
          <div class="info-window">
            <div class="item">${stationName}</div>
            <div class="item">可借車輛 <span>${availableRentBikes}</span></div>
            <div class="item">可停空位 <span>${availableReturnBikes}</span></div>
          </div>`

          if (props.searchType === 'Rent') {
            const markers = createHTMLMapMarker({
              latlng: latling,
              map: map.value,
              html: `<div class="location-count">
                <img class="locaion-img" src="${availableRentBikes === 0 ? 'img/zero.png' : 'img/rent-location.png'}">
                <div class="count rent">${availableRentBikes}</div>
                </div`
            });
            window.google.maps.event.addListener(markers, "click", function (e) {
              infoWindow.setContent(infoContentString);
              infoWindow.open(map, markers);
            });

          } 
          else if (props.searchType === 'Return') {
            const markers = createHTMLMapMarker({
              latlng: latling,
              map: map.value,
              html: `<div class="location-count">
                <img class="locaion-img" src="${availableReturnBikes === 0 ? 'img/zero.png' : 'img/return-location.png'}">
                <div class="count return ${availableReturnBikes === 0 ? 'zero' : null}">${availableReturnBikes}</div>
                </div`
            });
            window.google.maps.event.addListener(markers, "click", function (e) {
              infoWindow.setContent(infoContentString);
              infoWindow.open(map, markers);
            });
          }
        });
      }
    };

    watch(() => props.currentPosition, async (v: any) => {
      center.value = v;
      initMap();
      const marker = new window.google.maps.Marker({
        position: v,
        map: map.value,
        // TODO: 動態圖
        // icon: 'https://upload.cc/i1/2021/11/14/rKTL5z.png',
      });
      await getNearByBikeStationInfo(v);
      setStationMakers()
    });

    watch(() => props.searchType, ()=> {
      setStationMakers();
    });

    onMounted(() => {
      initMap();
    });
    return {
      formatStationInfo
    }
  },
})
</script>

<style lang="scss">
#map {
  height: calc(100vh - 120px);
}
.location-count {
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
      color: #FED801;
    }
    &.zero {
      color: #000000; 
    }
  }
}

.info-window {
  display: flex;
  flex-direction: column;
  padding: 10px;
  text-align: left;
  .item {
    font-size: 13px;
    line-height: 19px;
    font-weight: 600px;
    font-family: 'Noto Sans TC';
    span {
      font-family: 'Roboto';
      font-style: italic;
      font-weight: 900;
    }
  }
}

@media screen and (min-width: 1280px) {
  #map {
    height: calc(100vh - 55px);
  }
}
</style>