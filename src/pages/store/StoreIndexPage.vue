<template>
  <div>
    <StoreNavBar></StoreNavBar>
    <router-view></router-view>
  </div>
</template>

<script>
  import StoreNavBar from '../../components/store/StoreNavBar.vue'

  export default {
    components: {
      StoreNavBar
    }
  }
</script>

<style>

</style>
