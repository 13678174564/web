import Vue from 'vue';
import app from "./app.vue";
import VueRouter from "vue-router";
import  router from './router'
import './libs/mui/css/mui.min.css'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import {Swipe,SwipeItem} from 'mint-ui'
import axios from 'axios'
import store from "@/store";
Vue.prototype.$axios=axios;
Vue.component(Swipe.name,Swipe);
Vue.component(SwipeItem.name,SwipeItem);
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(Mint);
require('./mock.js')
const vueTap = require('vue2-tap')
Vue.use(vueTap)
new Vue({
    el:'#app',
    render:h=>h(app),
    router,
    store
})
//1
//2