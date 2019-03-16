// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'

// import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';

// Vue.use(socketio('http://localhost:8088'));

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
