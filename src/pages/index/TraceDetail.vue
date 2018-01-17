<template>
  <div>
    <div>
      <search-box></search-box>
    </div>
    <div class="company">
      <div>
        <img :src="path + company.business_license" />
        <img :src="path + company.safety_certification" />
        <img :src="path + company.logo" />
        <img :src="path + company.qualification" />
      </div>
    </div>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { path, requestInShow } from '../../util/const'
  import SearchBox from '../../components/base/SearchBox.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'product-detail',
    computed: {
      ...mapGetters({
        user: 'getUser'
      })
    },
    data () {
      return {
        productId: this.$route.params.id,
        company: {},
        path: path.PICTURE
      }
    },
    mounted () {
      this.getTraceDetail()
    },
    methods: {
      getTraceDetail () {
        axios.get(requestInShow.TRACE_DETAIL, {params: {tracecode: this.$route.query.tracecode}})
          .then((res) => {
            this.company = res.data.company
          })
      }
    },
    components: {
      SearchBox
    }
  }
</script>

<style scoped>
  .company img{
    width: 100%;
    height: 100%;
  }
  .comment-btn {
    position:fixed;
    top: 200px;
    right: 0px;
  }
</style>

