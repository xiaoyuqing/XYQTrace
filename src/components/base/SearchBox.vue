<template>
  <!-- <div class="top-banner">
    <div class="logo">
      <img src="../../images/tagpicmain.png" />
      <h1>中科院食品安全防伪追溯系统</h1>
    </div>
    <div class="searchBox">
      <input type="text" placeholder="请输公司或产品名称" v-model="name" @keyup.enter="search()"/>
      <button @click="search()">追溯一下</button>
    </div>
  </div> -->
  <!-- Site header -->
  <header class="site-header site-header-cheng size-lg text-center">
    <div class="container">
      <div class="col-md-8 col-md-offset-2">
        <h2 class="logo-head-tit"><img src="../../images/logo-head.png" alt="logo-alt" class="logo-head">中科院食品安全防伪追溯系统</h2>
        <form class="header-job-search header-job-search-cheng">
          <div class="input-keyword">
            <input type="text" class="form-control" placeholder="请输入公司或产品名称" v-model="name" @keyup.enter="search()">
          </div>
          <div class="btn-search">
            <button class="btn btn-green" type="submit" @click="search()">追溯一下</button>
          </div>
        </form>
      </div>

    </div>
  </header>
  <!-- END Site header -->
</template>
<script>
import axios from 'axios'
import { requestInShow } from '../../util/const'
export default {
  data () {
    return {
      name: '',
      current_page: 1,
      size: 5
    }
  },
  mounted () {
    let name = localStorage.getItem('searchContext')
    if (name) {
      this.name = name
    }
  },
  methods: {
    search () {
      localStorage.setItem('searchContext', this.name)
      axios.get(requestInShow.SEARCH, {params: {
        name: this.name,
        current_page: this.current_page,
        size: this.size}})
      .then((res) => {
        let product = res.data
        localStorage.setItem('productDetail', JSON.stringify(product))
        this.$store.dispatch('loadProductDetail')
        this.$router.push({path: '/index/productList'})
      })
    }
  }
}
</script>
