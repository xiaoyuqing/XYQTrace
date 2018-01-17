<template>
  <div class="container">
    订单提交成功
    <br>
    <router-link :to="{path:'/store/user/orderInfo'}">查看兑换记录</router-link>
    <router-link :to="{path:'/store/product'}">继续兑换</router-link>
  </div>
</template>

<script>

</script>

<style scoped>
  .container{
    margin-top: 100px;
  }
</style>
