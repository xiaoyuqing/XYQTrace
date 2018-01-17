<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-4">
        <ul class="list-group">
          <li class="list-group-item"><router-link :to="{path:'/store/user/userInfo'}">个人信息</router-link></li>
          <li class="list-group-item"><router-link :to="{path:'/store/user/contactInfo'}">修改收货信息</router-link></li>
          <li class="list-group-item"><router-link :to="{path:'/store/user/orderInfo'}">查看兑换记录</router-link></li>
        </ul>
      </div>
      <div class="col-xs-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
  .container {
    margin-top: 100px;
  }
</style>
