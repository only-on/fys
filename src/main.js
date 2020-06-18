// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import './assets/styles/layout/layout.less'
import './assets/styles/cover/cover.less'
import './assets/styles/base/base.less'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
import VideoPlayer from 'vue-video-player'
// 图标库
import './assets/iconfont/iconfont.css'
// 滚动条
import 'vue-happy-scroll/docs/happy-scroll.css'
Vue.config.productionTip = false
Vue.use(ViewUI)
Vue.use(VideoPlayer);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
