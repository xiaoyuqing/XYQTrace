<template>
  <Row>
    <i-col span="8" offset="8">
      <p>注册成功</p>
      <i-button type="primary" @click="goToShow">返回首页</i-button>
      <i-button type="primary" @click="goToLogin">去登录</i-button>
    </i-col>
  </Row>
</template>

<script>
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'
  // import IButton from 'iview/src/components/button/button'

  export default {
    components: {
      // ICol,
      // Row,
      // IButton
    },
    name: 'register-success',
    methods: {
      goToShow () {
        this.$router.push({path: '/index/show'})
      },
      goToLogin () {
        this.$router.push({path: '/index/login'})
      }
    }
  }
</script>

<style scoped>

</style>
