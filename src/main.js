import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { Table, TableColumn, Pagination } from 'element-ui'

// 引入全局 CSS
import './styles/index.less'

// 按需引入 element-ui
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)

// axios 配置
axios.defaults.baseURL = 'https://api.doctorxiong.club'
axios.interceptors.response.use(
  function(response) {
    // 直接返回数据，省去在组件中进一步处理
    return response.data
  },
  function(error) {
    return Promise.reject(error)
  }
)

Vue.filter('formatGrowth', function(value) {
  const v = Number(value).toFixed(2)
  return v >= 0 ? `+${v}%` : `${v}%`
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
