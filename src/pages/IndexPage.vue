<template>
  <div>
    <index-nav-bar></index-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import IndexNavBar from '../components/index/IndexNavBar'
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'

  export default {
    components: {
      // ICol,
      // Row,
      IndexNavBar
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    }
  }
</script>

<style>

</style>
