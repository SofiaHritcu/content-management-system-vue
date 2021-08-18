import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuetify from './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VImageInput from 'vuetify-image-input';
import VueCompositionAPI from '@vue/composition-api'


Vue.use(Vuetify)
Vue.use(VueCompositionAPI)
Vue.config.productionTip = false
Vue.component(VImageInput.name, VImageInput);

new Vue({
  router,
  vuetify: Vuetify,
  render: h => h(App)
}).$mount('#app')
