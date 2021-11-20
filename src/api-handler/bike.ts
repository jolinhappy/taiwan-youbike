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
  getOneStationInfo(city: string, stationName: string) {
    return apiHelper.get<IBikeStation[]>(`${basePath}/Station/${city}?$filter=StationName/Zh_tw eq '${stationName}'`);
  },
  getFilterdAvailabilityBike(city: string, stationUID: string) {
    return apiHelper.get<IBikeAvailability[]>(`${basePath}/Availability/${city}?$filter=contains(StationUIS,'${stationUID}')`);
  },
  getNearByStationInfo(lat: number, lng: number) {
    return apiHelper.get<IBikeStation[]>(`${basePath}/Station/NearBy?$spatialFilter=nearby(${lat}, ${lng}, 1000)`);
  },
  getNearByAvailabilityBike(lat: number, lng: number) {
    return apiHelper.get<IBikeAvailability[]>(`${basePath}/Availability/NearBy?$spatialFilter=nearby(${lat}, ${lng}, 1000)`);
  },
}