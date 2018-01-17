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
    <Button type="primary" class="comment-btn" @click="goToComment">评论</Button>
  </div>
</template>
<script>
  // import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { path, requestInShow } from '../../util/const'
  import SearchBox from '../../components/base/SearchBox.vue'
  export default {
    name: 'product-detail',
    computed: {
    },
    data () {
      return {
        productId: this.$route.params.id,
        company: {},
        path: path.PICTURE
      }
    },
    mounted () {
      this.getCompanyDetail()
    },
    methods: {
      getCompanyDetail () {
        axios.get(requestInShow.COMPANY_DETAIL, {params: {product_id: this.productId}})
        .then((res) => {
          this.company = res.data.company
        })
      },
      goToComment () {
        this.$router.push({path: '/index/comment/' + this.productId})
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
  height: 300px;
}
.comment-btn {
  position:fixed;
  top: 200px;
  right: 0px;
}
</style>

