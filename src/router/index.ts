import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/find-bike',
    name: 'FindBike',
    component: () => import(/* webpackChunkName: "FindBike" */ '@/views/FindBike.vue'),
    props: true,
  },
  {
    path: '/find-bike-lane',
    name: 'FindBikeLane',
    component: () => import(/* webpackChunkName: "FindBikeLane" */ '@/views/FindBikeLane.vue'),
    props: true,
  },
  {
    path: '/find-bike-lane/map',
    name: 'FindBikeLaneMap',
    component: () => import(/* webpackChunkName: "FindBikeLaneMap" */ '@/components/find-bike-lane/FindBikeLaneMap.vue'),
  },
  {
    path: '/scenic-food',
    name: 'FindScenicFood',
    component: () => import(/* webpackChunkName: "FindScenicSpot" */ '@/views/FindScenicFood.vue'),
  },
  {
    path: '/scenic-food/detail',
    name: 'ScenicFoodInfoDetail',
    component: () => import(/* webpackChunkName: "ScenicFoodInfoDetail" */ '@/views/ScenicFoodInfoDetail.vue'), 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
