<template>
  <div class="navbar navbar-fixed-top navbar-default">
    <div class="container">
      <div class="navbar-header">
        <a href="javascript:;" class="navbar-brand">中科院食品安全防伪追溯系统</a>
        <button class="navbar-toggle" data-toggle="collapse" data-target=".rs">
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <div class="collapse navbar-collapse rs">
        <ul class="nav navbar-nav navbar-right">
          <li><router-link :to="{path:'/index'}">系统首页</router-link></li>
          <li><router-link :to="{path:'/store/gift'}">商城首页</router-link></li>
          <li><router-link :to="{path:'/store/favorite'}">收藏夹</router-link></li>
          <li><router-link :to="{path:'/store/cart'}">购物车</router-link></li>
          <li><router-link :to="{path:'/store/user/userInfo'}">个人中心</router-link></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

</script>
