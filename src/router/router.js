import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexPage from '../pages/IndexPage.vue'
import StoreIndexPage from '../pages/store/StoreIndexPage.vue'
import GiftShowPage from '../pages/store/GiftShowPage.vue'
import GiftDetailPage from '../pages/store/GiftDetailPage.vue'
import CartPage from '../pages/store/CartPage.vue'
import FavoritePage from '../pages/store/FavoritePage.vue'
import UserPage from '../pages/store/UserPage.vue'
import ConfirmPage from '../pages/store/ConfirmPage.vue'
import ContactInfoManage from '../components/store/ContactInfoManage.vue'
import OrderInfoManage from '../components/store/OrderInfoManage.vue'
import UserInfoShow from '../components/store/UserInfoShow.vue'
import ConfirmSuccessPage from '../pages/store/ConfirmSuccessPage.vue'
import Login from '../components/index/Login.vue'
import Register from '../components/index/Register.vue'
import RegisterSuccess from '../components/index/RegisterSuccess.vue'
import Show from '../pages/index/Show.vue'
import ProductList from '../pages/index/ProductList.vue'
import ProductDetail from '../pages/index/ProductDetail.vue'
import TraceDetail from '../pages/index/TraceDetail.vue'
import Comment from '../pages/index/Comment.vue'
import UserInfoModify from '../components/index/UserInfoModify.vue'

import PasswordModify from '../components/index/PasswordModify.vue'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/index/show'},
    {path: '/index', redirect: '/index/show'},
    {
      path: '/index',
      component: IndexPage,
      children: [
        {path: 'login', component: Login},
        {path: 'register', component: Register},
        {path: 'registerSuccess', component: RegisterSuccess},
        {path: 'show', component: Show},
        {path: 'productList', component: ProductList},
        {path: 'productDetail/:id', component: ProductDetail},
        {path: 'traceDetail', component: TraceDetail},
        {path: 'comment/:id', component: Comment},
        {path: 'userInfoModify', component: UserInfoModify},
        {path: 'passwordModify', component: PasswordModify}
      ]
    },
    {
      path: '/store',
      component: StoreIndexPage,
      children: [
        {path: 'gift', component: GiftShowPage},
        {path: 'detail/:id', component: GiftDetailPage, props: true},
        {path: 'favorite', component: FavoritePage},
        {path: 'cart', component: CartPage},
        {
          path: 'user',
          component: UserPage,
          children: [
            {path: 'contactInfo', component: ContactInfoManage},
            {path: 'orderInfo', component: OrderInfoManage},
            {path: 'userInfo', component: UserInfoShow}
          ]
        },
        {path: 'confirm', component: ConfirmPage},
        {path: 'confirmSuccess', component: ConfirmSuccessPage}
      ]
    }
  ]
})
