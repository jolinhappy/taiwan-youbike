import { apiHelper } from '../utils/api-helper';
import {
  IScenicSpotTourismInfo,
  IRestaurantTourismInfo,
} from '@/types/tourism';
const basePath = 'Tourism';
export default {
  getAllScenicSpots(count: number) {
    return apiHelper.get<IScenicSpotTourismInfo[]>(`${basePath}?$top=${count}`);
  },
  getNearbyScenicSpots(lat: number, lng: number) {
    return apiHelper.get<IScenicSpotTourismInfo[]>(`${basePath}/ScenicSpot?$spatialFilter=nearby(${lat}, ${lng}, 1000)`);
  },
  getAllRestaurants() {
    return apiHelper.get<IRestaurantTourismInfo[]>(`${basePath}/Restaurant`);
  },
  getNearbyRestaurants(lat: number, lng: number) {
    return apiHelper.get<IRestaurantTourismInfo[]>(`${basePath}/Restaurant?$spatialFilter=nearby(${lat}, ${lng},1000)`);
  },
}