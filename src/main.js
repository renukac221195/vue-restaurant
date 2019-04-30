// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'
import store from './stores/store'

Vue.config.productionTip = false

Vue.use(Vuetify,{
  iconfont: 'md',
  iconfont: 'mdi'
});

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})