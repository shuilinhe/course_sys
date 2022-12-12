import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import 'element-ui/lib/theme-chalk/index.css'
import {
  Table,
  Button,
  Badge,
  TableColumn,
  Form,
  FormItem,
  Input,
  Card,
  Container,
  Header,
  Main,
  Aside,
  Row,
  Col,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Image,
  Avatar,
  MessageBox,
  Pagination,
  Message,
  Dialog,
  Tag,
  Upload,
  Link,
  Tabs,
  Empty,
  TabPane,
  BreadcrumbItem,
  Breadcrumb,
  Calendar,
  Tooltip
} from 'element-ui'

Vue.config.productionTip = false
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Tag)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Avatar)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Image)
Vue.use(Table)
Vue.use(Button)
Vue.use(Badge)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Card)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Link)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(Empty)
Vue.use(TabPane)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Calendar)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = "/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 5000

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//给axios配置默认属性
axios.defaults.timeout= 2000;//配置了默认超时时间
axios.defaults.baseURL='http://124.71.112.154:8001';
//配置请求的地址，若不配置，则axios默认从自身的地址发送请求；若配置了，写请求时不需要带以上写过的地址，只需要写后面的地址会自动拼接！
