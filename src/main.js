import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Storage from 'vue-ls'
import {
  Table,
  TableColumn,
  Pagination,
  Loading,
  Input,
  Row,
  Col,
  Button,
  Select,
  Option
} from 'element-ui'
require('promise.prototype.finally').shim()

// 引入全局 CSS
import './styles/index.less'

// 存储配置
Vue.use(Storage, {
  namespace: 'fund__',
  name: 'ls',
  storage: 'local'
})

// 按需引入 element-ui
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Loading.directive)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Select)
Vue.use(Option)

// axios 配置
Vue.prototype.$axios = axios
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
