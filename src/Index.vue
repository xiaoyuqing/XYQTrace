<template>
  <div>
    <router-view></router-view>
    <Foot></Foot>
  </div>
</template>

<script>
  import Foot from './components/base/Foot.vue'

  export default {
    name: 'index',
    components: {
      Foot
    }
  }
</script>

<style>
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    border: none;
    outline-style: none;
  }
</style>
