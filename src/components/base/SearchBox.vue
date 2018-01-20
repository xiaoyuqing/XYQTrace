<template>
  <!-- Site header -->
  <header class="site-header site-header-cheng size-lg text-center">
    <div class="container">
      <div class="col-md-8 col-md-offset-2">
        <!--<h2 class="logo-head-tit"><img src="../../images/logo-head.png" alt="logo-alt" class="logo-head">中科院食品安全防伪追溯系统</h2>-->
        <div class="header-job-search header-job-search-cheng">
          <div class="input-keyword">
            <input type="text" class="form-control" placeholder="请输入公司或产品名称" :value="searchContext" @input="updateContext" @keyup.enter="search()">
          </div>
          <div class="btn-search">
            <button class="btn btn-green" type="button" @click="search()">追溯一下</button>
          </div>
        </div>
      </div>

    </div>
  </header>
  <!-- END Site header -->
</template>
<script>
// import axios from 'axios'
// import { requestInShow } from '../../util/const'
import { mapActions, mapState } from 'vuex'
export default {
  data () {
    return {
      current_page: 1,
      size: 10
    }
  },
  mounted () {
  },
  computed: {
    ...mapState({
      searchContext: state => state.searchContext
    })
  },
  methods: {
    ...mapActions([
      'productFind'
    ]),
    updateContext (e) {
      this.$store.commit('UPDATE_CONTEXT', e.target.value)
    },
    search () {
      if (this.searchContext === '') {
        this.$Message.warning('请输入查询信息')
        return
      }
      let that = this
      this.productFind().then(
        function () {
          that.$router.push({path: '/index/productList?name=' + that.searchContext})
        }
      )
    }
  }
}
</script>
