<template>
  <i-menu mode="horizontal" theme="light" activeName="login">
    <i-menu-item name="show">
      <router-link :to="{path:'/index/show'}">主页</router-link>
    </i-menu-item>
    <div v-if="JSON.stringify(user)==='{}'">
      <i-menu-item name="login">
        <router-link :to="{path:'/index/login'}">登录</router-link>
      </i-menu-item>
      <i-menu-item name="register">
        <router-link :to="{path:'/index/register'}">注册</router-link>
      </i-menu-item>
    </div>
    <div v-else>
      <submenu name="logined">
        <template slot="title">
          欢迎您，{{user.username}}
        </template>
        <i-menu-item name="profile">
          <router-link :to="{path:'/index/userInfoModify'}">修改个人资料</router-link>
        </i-menu-item>
        <i-menu-item name="profile">
          <router-link :to="{path:'/index/passwordModify'}">修改密码</router-link>
        </i-menu-item>
        <i-menu-item name="logout">
          <a @click="logout">注销</a>
        </i-menu-item>
      </submenu>
      <i-menu-item name="store">
        <router-link :to="{path:'/store/gift'}">积分商城</router-link>
      </i-menu-item>
    </div>
  </i-menu>
</template>

<script>
  import IMenu from '../../../node_modules/iview/src/components/menu/menu.vue'
  import IMenuItem from '../../../node_modules/iview/src/components/menu/menu-item.vue'
  import {mapGetters} from 'vuex'
  import Submenu from 'iview/src/components/menu/submenu'

  export default {
    name: 'index-nav-bar',
    components: {
      Submenu,
      IMenuItem,
      IMenu
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    methods: {
      logout () {
        this.$store.dispatch('deleteUserFromStore')
        this.$router.push({path: '/index/show'})
      }
    }
  }
</script>

<style scoped>

</style>
