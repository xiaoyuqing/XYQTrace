<template>
  <div>
    <index-nav-bar></index-nav-bar>
    <search-box></search-box>
    <router-view></router-view>
  </div>
</template>

<script>
  import IndexNavBar from '../components/index/IndexNavBar'
  import SearchBox from '../components/base/SearchBox.vue'
  // import Row from 'iview/src/components/grid/row'
  // import ICol from 'iview/src/components/grid/col'

  export default {
    components: {
      // ICol,
      // Row,
      IndexNavBar,
      SearchBox
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
