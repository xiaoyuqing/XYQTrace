<template>
  <div>
    {{user.username}}，您好
    <br>
    您所拥有的积分：{{user.point}}
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    mounted: function () {
      this.$store.dispatch('loadUserFromLocal')
    },
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    }
  }
</script>

<style scoped>

</style>
