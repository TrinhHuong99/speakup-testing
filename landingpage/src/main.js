import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueQuillEditor from 'vue-quill-editor'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import '@axios'
import VueFacebookPixel from 'vue-facebook-pixel'

Vue.use(VueFacebookPixel)
Vue.analytics.fbq.init('245564050537290')

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false

// Vue Router
import router from './router'
// Vuex Store
import store from './store/store'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
