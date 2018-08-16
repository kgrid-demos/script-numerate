import Vue from 'vue';
import VueRouter from 'vue-router';
import moment from 'moment'
import Vuex from 'vuex';
import App from './App';
import store from './store';
import Icon from 'vue-awesome/components/Icon'
import eventBus from './components/eventBus.js';
import axios from 'axios';
import Autocomplete from 'v-autocomplete'

// You need a specific loader for CSS files like https://github.com/webpack/css-loader
import 'v-autocomplete/dist/v-autocomplete.css'

Vue.use(Autocomplete)
require('es6-promise').polyfill();
require('lodash');
require('moment');
require('prismjs');
require('prismjs/components/prism-yaml')
// debug mode
Vue.config.debug = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.component('icon', Icon)
Vue.prototype.$http = axios
Vue.prototype.$moment = moment
Vue.prototype.$eventBus= eventBus
// create router
const routes = [
                { path : '/', component : require('./components/home.vue')	}
                	    ];
const router = new VueRouter({
  routes : routes,
  history: true,
  hashbang : false
});
Vue.filter('formatSize', function (size) {
  if (size > 1024 * 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024 / 1024).toFixed(2) + ' TB'
  } else if (size > 1024 * 1024 * 1024) {
    return (size / 1024 / 1024 / 1024).toFixed(2) + ' GB'
  } else if (size > 1024 * 1024) {
    return (size / 1024 / 1024).toFixed(2) + ' MB'
  } else if (size > 1024) {
    return (size / 1024).toFixed(2) + ' KB'
  }
  return size.toString() + ' B'
})
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMMM DD, YYYY')
  }
});
Vue.directive(
  'click-outside', {
    bind: function(el, binding, vNode) {
    if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
        var warn = "[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be"
        if (compName) { warn += "Found in component '${compName}'" }
        console.warn(warn)
      }
      const bubble = binding.modifiers.bubble
      const handler = (e) => {
        if (bubble || (!el.contains(e.target) && el !== e.target)) {
          binding.value(e)
        }
      }
      el.__vueClickOutside__ = handler
      // add Event Listeners
      document.addEventListener('click', handler)
    },
    unbind: function(el, binding) {
      // Remove Event Listeners
      document.removeEventListener('click', el.__vueClickOutside__)
      el.__vueClickOutside__ = null
    }
  }
)
var vm = new Vue({
	router : router,
	el: '#app',
  store,
	data : {},
	components:{ App	},
	created: function(){
    console.log('Knowledge Grid Library Web Application\nBuild 20180720');

	}
	}).$mount('#app');
