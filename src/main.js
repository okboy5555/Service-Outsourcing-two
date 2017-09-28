// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'flex.css'
import 'github-markdown-css'
import Vue from 'vue'
import App from './App'
import routes from './router'
import vueRouter from 'vue-router'
import store from './store'
import components from './components'
import { scrollRecord } from './libs/index'
Object.keys(components).forEach((key) => {
  var tagName = key.replace(/(\w)/, (char) => char.toUpperCase());
  Vue.component(`v${tagName}`, components[key]);
})

import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
Vue.use(AlloyFingerVue, {
  AlloyFinger
})

Vue.directive('scroll-record', scrollRecord);
Vue.use(vueRouter);
Vue.config.productionTip = false

const router = new vueRouter({
  routes,
  mode: 'history',  
  base: '/'
})

socket.on('forceOffline', function (data) {
    alert(data);
    location.href = '/login'
});

router.beforeEach(({ meta, path }, from, next) => {
  const { auth =false } = meta;// auth defalut is true
  const is_login = Boolean(store.state.user)
  if(auth && !is_login && path!= '/login') {
    let to = { path: '/login' }
        return next(to);
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})

