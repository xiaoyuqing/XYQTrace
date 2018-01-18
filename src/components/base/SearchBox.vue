<template>
  <!-- Site header -->
  <header class="site-header site-header-cheng size-lg text-center">
    <div class="container">
      <div class="col-md-8 col-md-offset-2">
        <!--<h2 class="logo-head-tit"><img src="../../images/logo-head.png" alt="logo-alt" class="logo-head">中科院食品安全防伪追溯系统</h2>-->
        <div class="header-job-search header-job-search-cheng">
          <div class="input-keyword">
            <input type="text" class="form-control" placeholder="请输入公司或产品名称" v-model="name" @keyup.enter="search()">
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
import axios from 'axios'
// import { requestInShow } from '../../util/const'
export default {
  data () {
    return {
      name: this.$route.query.name ? this.$route.query.name : '',
      current_page: 1,
      size: 5
    }
  },
  mounted () {
  },
  methods: {
    search () {
      // axios.get(requestInShow.SEARCH, {params: {
      //   name: this.name,
      //   current_page: this.current_page,
      //   size: this.size}})
      // .then((res) => {
      //   let product = res.data
      //   localStorage.setItem('productDetail', JSON.stringify(product))
      //   this.$store.dispatch('loadProductDetail')
      //   this.$router.push({path: '/index/productList'})
      // })
      axios.get('http://localhost:3000/comments', {params: {
        name: this.name
      }})
      .then((res) => {
        let product = {}
        if (res.data[0]) {
          product = res.data[0]
        } else {
          product = {
            rows: [],
            total: 0
          }
        }
        localStorage.setItem('productDetail', JSON.stringify(product))
        this.$store.dispatch('loadProductDetail')
        this.$router.push({path: '/index/productList?name=' + this.name})
      })
    }
  }
}
</script>
