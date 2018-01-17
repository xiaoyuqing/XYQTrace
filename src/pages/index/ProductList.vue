<template>
  <div>
    <div>
      <search-box></search-box>
    </div>
    <div class="search-result">
      <div class="result" v-for="(item,$index) in product" :key="$index">
        <div>
          <a href="">
            <img src=""/>
          </a>
        </div>
        <div class="product-detail">
          <ul>
            <li><a @click="goToProductDetail(item.id)">{{item.company.name}}</a></li>
            <li><a @click="goToProductDetail(item.id)">{{item.name}}</a></li>
            <li><a @click="goToProductDetail(item.id)">{{item.introduction}}</a></li>
          </ul>
        </div>
      </div>
    </div>
    <Row type="flex" justify="center">
      <page :total='total' :pageSize='size' @on-change="change"></page>
    </Row>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import axios from 'axios'
  import { requestInShow } from '../../util/const'
  import SearchBox from '../../components/base/SearchBox.vue'
  export default {
    name: 'product-list',
    computed: {
      ...mapGetters({
        productList: 'getProductDetail'
      }),
      total: {
        get: function () {
          if (this.productList) {
            return this.productList.total
          }
        }
      }
      // product: {
      //   get: function () {
      //     if (this.data.length > 0) {
      //       return this.data
      //     } else {
      //       if (this.productList) {
      //         return this.productList.rows
      //       }
      //     }
      //   }
      // }
    },
    data () {
      return {
        name: '',
        current_page: 1,
        size: 5,
        data: [],
        product: []
      }
    },
    created () {
      this.$store.dispatch('loadProductDetail')
      this.product = this.productList.rows
      console.log(this.productList)
    },
    // mounted () {
    //   this.$store.dispatch('loadProductDetail')
    //   console.log(this.productList)
    //   this.total = this.productList.total
    //   this.product = this.productList.rows
    // },
    methods: {
      change (page) {
        localStorage.setItem('searchContext', this.name)
        axios.get(requestInShow.SEARCH, {params: {
          name: this.name,
          current_page: page,
          size: this.size}})
        .then((res) => {
          let data = res.data
          this.data = data.rows
        })
      },
      goToProductDetail (id) {
        this.$router.push({path: '/index/productDetail/' + id})
      }
    },
    components: {
      SearchBox
    },
    watch: {
      data: function (newvalue) {
        console.log(111)
        this.product = newvalue
      }
    }
  }
</script>

<style scoped>
.result{
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}
.result img{
  width: 100px;
  height: 100px;
  margin-right: 2rem;
}
.search-result .product-detail ul li a{
  color: #000000;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
}
</style>

