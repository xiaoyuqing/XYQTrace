<template>
  <div>
    <Search></Search>
    <Gift></Gift>
  </div>
</template>

<script>
  import Search from '../../components/store/Search.vue'
  import Gift from '../../components/store/Gift.vue'

  export default {
    components: {
      Search,
      Gift
    }
  }
</script>
