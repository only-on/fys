import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/map',
      name: 'map',
      component: resolve => require(['../view/map/index.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../view/layout/home.vue'], resolve),
      children: [
        {
          path: '/dev',
          name: 'dev',
          component: resolve => require(['../page/development.vue'], resolve)
        },
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['../view/user/index.vue'], resolve)
        },
        {
          path: '/user_create',
          name: 'user_create',
          component: resolve => require(['../view/user/create.vue'], resolve)
        },
        {
          path: '/user_detail',
          name: 'user_detail',
          component: resolve => require(['../view/user/detail.vue'], resolve)
        },
        {
          path: '/assetsCategory',
          name: 'assetsCategory',
          component: resolve => require(['../view/fixedAssets/assetsCategory/index.vue'], resolve)
        },
        {
          path: '/assetsCategory_create',
          name: 'assetsCategory_create',
          component: resolve => require(['../view/fixedAssets/assetsCategory/create.vue'], resolve)
        },
        {
          path: '/assetsCategory_detail',
          name: 'assetsCategory_detail',
          component: resolve => require(['../view/fixedAssets/assetsCategory/detail.vue'], resolve)
        },
        {
          path: '/assets',
          name: 'assets',
          component: resolve => require(['../view/fixedAssets/assets/index.vue'], resolve)
        },
        {
          path: '/assets_create',
          name: 'assets_create',
          component: resolve => require(['../view/fixedAssets/assets/create.vue'], resolve)
        },
        {
          path: '/assets_detail',
          name: 'assets_detail',
          component: resolve => require(['../view/fixedAssets/assets/detail.vue'], resolve)
        },
        {
          path: '/assets_Main',
          name: 'assets_Main',
          component: resolve => require(['../view/fixedAssets/assetsMain/index.vue'], resolve)
        },
        {
          path: '/record_create',
          name: 'record_create',
          component: resolve => require(['../view/fixedAssets/assetsMain/mainManger/create.vue'], resolve)
        },
        {
          path: '/record_detail',
          name: 'record_detail',
          component: resolve => require(['../view/fixedAssets/assetsMain/mainManger/detail.vue'], resolve)
        },
        {
          path: '/information',
          name: 'information',
          component: resolve => require(['../view/systemconfig/information/index.vue'], resolve)
        },
        {
          path: '/information_create',
          name: 'information_create',
          component: resolve => require(['../view/systemconfig/information/create.vue'], resolve)
        },
        {
          path: '/information_detail',
          name: 'information_detail',
          component: resolve => require(['../view/systemconfig/information/check.vue'], resolve)
        },
        {
          path: '/log',
          name: 'log',
          component: resolve => require(['../view/log/index.vue'], resolve)
        },
        {
          path: '/house',
          name: 'house',
          component: resolve => require(['../view/home/index.vue'], resolve)
        },
        {
          path: '/warn',
          name: 'warn',
          component: resolve => require(['../view/warnManager/index.vue'], resolve)
        },
        {
          path: '/contractWarn_create',
          name: 'contractWarn_create',
          component: resolve => require(['../view/warnManager/contractWarn/create.vue'], resolve)
        },
        {
          path: '/fixedWarn_create',
          name: 'fixedWarn_create',
          component: resolve => require(['../view/warnManager/fixedWarn/create.vue'], resolve)
        },
        {
          path: '/fixedWarn_detail',
          name: 'fixedWarn_detail',
          component: resolve => require(['../view/warnManager/fixedWarn/detail.vue'], resolve)
        },
        {
          path: '/house_create',
          name: 'house_create',
          component: resolve => require(['../view/home/create.vue'], resolve)
        },
        {
          path: '/house_detail',
          name: 'house_detail',
          component: resolve => require(['../view/home/check.vue'], resolve)
        },
        {
          path: '/house_images',
          name: 'house_images',
          component: resolve => require(['../view/home/images/index.vue'], resolve)
        },
        {
          path: '/house_video',
          name: 'house_video',
          component: resolve => require(['../view/home/videos/index.vue'], resolve)
        },
        {
          path: '/house_video_play',
          name: 'house_video_play',
          component: resolve => require(['../view/home/videos/video.vue'], resolve)
        },
        {
          path: '/house_room',
          name: 'house_room',
          component: resolve => require(['../view/home/room/index.vue'], resolve)
        },
        {
          path: '/house_room_create',
          name: 'house_room_create',
          component: resolve => require(['../view/home/room/create.vue'], resolve)
        },
        {
          path: '/house_room_detail',
          name: 'house_room_detail',
          component: resolve => require(['../view/home/room/check.vue'], resolve)
        },
        {
          path: '/house_lease',
          name: 'house_lease',
          component: resolve => require(['../view/home/lease/index.vue'], resolve)
        },
        {
          path: '/house_lease_create',
          name: 'house_lease_create',
          component: resolve => require(['../view/home/lease/create.vue'], resolve)
        },
        {
          path: '/house_lease_images',
          name: 'house_lease_images',
          component: resolve => require(['../view/home/lease/images.vue'], resolve)
        },
        {
          path: '/house_lease_detail',
          name: 'house_lease_detail',
          component: resolve => require(['../view/home/lease/check.vue'], resolve)
        },
      ]
    },
    {
      path: '/',
      component: resolve => require(['../view/map/index.vue'], resolve)
    },
    {
      path: '/test',
      component: resolve => require(['../view/test1.vue'], resolve)
    },
  ]
})
