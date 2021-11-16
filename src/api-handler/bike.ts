import { apiHelper } from '../utils/api-helper';
import {
  IBikeStation,
  IBikeAvailability,
} from '@/types/bike';
const basePath = 'Bike';
export default {
  getStationInfo(city: string) {
    return apiHelper.get<IBikeStation[]>(`${basePath}/Station/${city}`);
  },
  getAvailabilityBike(city: string) {
    return apiHelper.get<IBikeAvailability[]>(`${basePath}/Availability/${city}`);
  },
  getNearByStationInfo(lat: number, lng: number) {
    return apiHelper.get<IBikeStation[]>(`${basePath}/Station/NearBy?$spatialFilter=nearby(${lat}, ${lng}, 200)`);
  },
  getNearByAvailabilityBike(lat: number, lng: number) {
    return apiHelper.get<IBikeAvailability[]>(`${basePath}/Availability/NearBy?$spatialFilter=nearby(${lat}, ${lng}, 200)`);
  },
}