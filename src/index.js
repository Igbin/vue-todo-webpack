import Vue from 'vue';
import App from './App.vue';
import router from './router';
import "./assets/main.scss";

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
