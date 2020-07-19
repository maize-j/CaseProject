import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast/index'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

//安装toast插件
Vue.use(toast)

//解决移动端300ms的延迟
FastClick.attach(document.body)
//安装图片懒加载插件
// Vue.use(VueLazyload)
//安装插件后img不能直接用:src，应使用v-lazy
//还可以添加图片未加载出来时的背景图片，placeholder

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
