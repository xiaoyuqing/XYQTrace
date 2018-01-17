<template>
  <div>
    <search-box></search-box>
    <!-- <div class="search-result">
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
    </div> -->
    <!-- Main container -->
    <main>
      <!-- Categories -->
      <section class="bg-alt">
        <div class="container">
          <div class="related-search">
            相关搜索：
            <a href="" class="btn btn-default text-muted btn-outline btn-sm btn-xs">茶罐头</a>
            <a href="" class="btn btn-default text-muted btn-outline btn-sm">茶水果</a>
            <a href="" class="btn btn-default text-muted btn-outline btn-sm">茶水果</a>
          </div>
          <!--list-->
          <div class="row">
            <div class="col-md-3" v-for="(item,$index) in product" :key="$index">
              <a @click="goToProductDetail(item.id)" class="search-box">
                <img src="../../images/07.jpg" alt="">
                <h6 @click="goToProductDetail(item.id)">{{item.company.name}}</h6>
                <p @click="goToProductDetail(item.id)">{{item.name}}</p>
                <p @click="goToProductDetail(item.id)">{{item.introduction}}</p>
              </a>
            </div>

          </div>
          <!--页码-->

        </div>
      </section>
      <!-- END Categories -->

    </main>
    <!-- END Main container -->
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
    mounted () {
      // this.$store.dispatch('loadProductDetail')
      this.product = this.productList.rows
      console.log(this.productList)
    },
    methods: {
      change (page) {
        localStorage.setItem('searchContext', this.name)
        axios.get(requestInShow.SEARCH, {params: {
          name: this.name,
          current_page: page,
          size: this.size}})
        .then((res) => {
          let data = res.data
          this.product = data.rows
        })
      },
      goToProductDetail (id) {
        this.$router.push({path: '/index/productDetail/' + id})
      }
    },
    components: {
      SearchBox
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

