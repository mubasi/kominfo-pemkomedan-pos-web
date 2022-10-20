require('./bootstrap')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'
// import cssVars from 'css-vars-ponyfill'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router/index.js'


import VueSweetalert2 from "vue-sweetalert2";
// If you don't need the styles, do not connect
import "sweetalert2/dist/sweetalert2.min.css";

// todo
// cssVars()


Vue.use(VueSweetalert2);
Vue.use(BootstrapVue)

router.beforeEach(async function (to, from, next) {
  document.title = to.meta.title + " | Kasir App";
  if (to.meta.auth) {
      await axios
          .get("/api/authentication")
          .then((response) => {
              next();
            //   let data = response.data;
            //   if (data.status) {
            //       next();
            //   } else {
            //       return next("/pages/login");
            //   }
          })
          .catch(() => {
              return next("/pages/login");
          });
  } else {
      next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
