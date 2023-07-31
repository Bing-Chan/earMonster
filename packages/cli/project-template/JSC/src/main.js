/*
 * @Author: dengjihua
 * @description: no des
 * @LastEditors: dengjihua
 * @LastEditTime: 2021-01-29 16:19:06
 * @Date: 2020-03-18 17:00:33
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import metaInfo from 'vue-meta-info'
import App from './App'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/table.css'
import 'swiper/dist/css/swiper.css'
require('./style/scss/style.scss');
// import VueWechatTitle from 'vue-wechat-title'
import {Button} from 'mint-ui'
import {InfiniteScroll, Spinner} from 'mint-ui';
import {Table, TableColumn} from 'element-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Toast from './components/common/Toast'
import Loading from './components/common/Loading'
import { Alert, Confirm } from './components/common/MessageBox'
import Affix from './components/common/Affix'
import SearchPanel from './components/common/SearchPanel/index'
import './utils/debugMode'
import '@/utils/vant'
import { watermark } from "./utils/watermark"
//import './libs/analytics.js'

import * as dd from 'dingtalk-jsapi'

Vue.component('yto-button', Button)
Vue.component('yto-table', Table)
Vue.component('yto-table-column', TableColumn)
Vue.component(Spinner.name, Spinner);
if (window.globalComponents) window.globalComponents(Vue, {initShowOptionalButton: true});
if (window.ytoReport) window.ytoReport(Vue);
Vue.use(InfiniteScroll);
Vue.use(VueAwesomeSwiper, /* { default global options } */)
Vue.use(metaInfo)
Vue.use(Affix)
Vue.use(SearchPanel)

// Vue.use(VueWechatTitle)

Vue.prototype.$alert = Alert
Vue.prototype.$confirm = Confirm
Vue.prototype.$toast = Toast
Vue.prototype.$loading = Loading
Vue.prototype.$dd=dd;
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.directive('wechat-title', {
  inserted(el, bind) {
    document.title = bind.value
  }
})
Vue.directive('title', {
  inserted(el, bind) {
    document.title = bind.value
  }
})
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

console.log(process.env)

Vue.filter('dateFormat', (date, type) => {
  if (date && typeof date === 'object') {
      let y = date.getFullYear(),
          m = date.getMonth() + 1,
          d = date.getDate()
      m = m < 10 ? ('0' + m) : m
      d = d < 10 ? ('0' + d) : d
      switch (type) {
          case 'year':
              return y + '年'
          case 'month':
              return y + '年' + m + '月'
          default:
              return y + '年' + m + '月' + d + '日'
      }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  mounted() {
    setTimeout(() => {
    }, 500);
  },
  template: '<App/>'
})
