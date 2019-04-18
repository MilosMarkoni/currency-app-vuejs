import Vue from "vue";
import VueRouter from "vue-router";

import App from "./App.vue";
import Routes from "./routes";

Vue.config.productionTip = false;

Vue.use(VueRouter);

// Routes
const router = new VueRouter({
  mode: "history",
  routes: Routes
});

new Vue({
  render: h => h(App),
  router: router
}).$mount("#app");
