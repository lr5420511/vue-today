import 'babel-polyfill';
import 'fetch-polyfill';
import Vue from 'vue';
import router from './plugins/plu-router';
import store from './plugins/plu-vuex';
import App from './app.vue';

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});