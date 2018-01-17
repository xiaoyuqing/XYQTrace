// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './style/index.css'
import Vue from 'vue'
import Index from './Index'
import 'bootstrap/dist/js/bootstrap.min'
import 'bootstrap/dist/css/bootstrap.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import store from './store/index'
import router from './router/router'

Vue.config.productionTip = false

Vue.use(iView)

/* eslint-disable no-new */
new Vue({
  el: '#index',
  router,
  store,
  template: '<Index/>',
  components: {Index}
})
