import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.func = require('./static/js/func.js');
Vue.prototype.sta = require('./static/js/sta.js');
Vue.prototype.globalData = require('./static/js/data.js');
Vue.prototype.urlRequest=require("./static/js/common.js");

App.mpType = 'app';

const app = new Vue({
    ...App
})
app.$mount()

