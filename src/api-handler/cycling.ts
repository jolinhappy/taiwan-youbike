import { apiHelper } from '../utils/api-helper';
import {
  IBikeShape,
} from '@/types/cycling';
const basePath = 'Cycling';
export default {
  getCyclingShape(city: string) {
    return apiHelper.get<IBikeShape[]>(`${basePath}/Shape/${city}`);
  },
  getFilteredCyclingShape(city: string, routeName: string) {
    return apiHelper.get<IBikeShape[]>(`${basePath}/Shape/${city}?$filter=RouteName eq '${routeName}'`);
  },
}