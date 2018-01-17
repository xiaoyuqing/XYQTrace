<template>
  <div class="top-banner">
    <div class="logo">
      <img src="../../images/tagpicmain.png" />
      <h1>中科院食品安全防伪追溯系统</h1>
    </div>
    <div class="searchBox">
      <input type="text" placeholder="请输公司或产品名称" v-model="name" @keyup.enter="search()"/>
      <button @click="search()">追溯一下</button>
    </div>
  </div>
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
